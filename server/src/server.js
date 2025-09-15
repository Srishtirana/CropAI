const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config/config');
const logger = require('./utils/logger');
const apiLimiter = require('./middleware/rateLimiter');

// Import routes
const authRoutes = require('./routes/auth');
// Import other routes here

// Initialize express app
const app = express();

// Increase the limit of JSON request body and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Increase the header size limit
app.use((req, res, next) => {
  // Set the maximum header size to 16KB (default is 8KB)
  req.headers['x-headers-size'] = '16kb';
  next();
});

// Enable trust proxy if behind a reverse proxy (like nginx)
app.set('trust proxy', 1);

// Middleware
app.use(helmet({
  // Disable the contentSecurityPolicy middleware to prevent conflicts
  contentSecurityPolicy: false,
}));

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Rate limiting
app.use('/api/', apiLimiter);

// Connect to MongoDB
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info('Connected to MongoDB');
}).catch(err => {
  logger.error('MongoDB connection error:', err);
  process.exit(1);
});

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Logging
app.use(morgan('combined', { stream: logger.stream }));

// Rate limiting for API routes
app.use('/api/v1/', apiLimiter);

// API routes
app.use('/api/v1/auth', authRoutes);
// Add other API routes here

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { error: err });
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Unhandled Rejection: ${err.message}`, { error: err });
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Start server
const PORT = config.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`, { error: err });
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
