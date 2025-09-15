require('dotenv').config();

const config = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d', // 7 days
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100, // requests per windowMs
  
  // Database configuration (if needed)
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/cropai',
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000'
  ],
  
  // Session configuration
  SESSION_SECRET: process.env.SESSION_SECRET || 'your_session_secret_here',
  SESSION_EXPIRATION: process.env.SESSION_EXPIRATION || 24 * 60 * 60 * 1000, // 24 hours
};

// Ensure required environment variables are set
const requiredEnvVars = ['JWT_SECRET', 'DB_URI'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar] && !config[envVar]) {
    console.warn(`Warning: ${envVar} environment variable is not set. Using default value.`);
  }
});

module.exports = config;
