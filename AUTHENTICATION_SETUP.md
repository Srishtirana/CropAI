# Authentication System Setup

This document provides instructions for setting up the authentication system in the CropAI application.

## Backend Setup

1. **Environment Variables**
   Create a `.env` file in the project root with the following variables:

   ```
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   
   # Database Configuration
   DB_URI=mongodb://localhost:27017/cropai
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # Session Configuration
   SESSION_SECRET=your_session_secret_here
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
   RATE_LIMIT_MAX=100  # requests per windowMs
   ```

2. **Dependencies**
   Install the required dependencies:
   ```bash
   npm install jsonwebtoken bcryptjs express-rate-limit express-session cookie-parser cors helmet morgan winston winston-daily-rotate-file
   ```

3. **Database**
   Ensure MongoDB is running locally or update the `DB_URI` to point to your MongoDB instance.

## Frontend Setup

1. **Environment Variables**
   Create a `.env` file in the project root with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

2. **Dependencies**
   The frontend requires the following dependencies:
   ```bash
   npm install axios react-router-dom @heroicons/react
   ```

## Available Scripts

- `npm start`: Start the development server
- `npm run server`: Start the backend server (add to package.json scripts if needed)
- `npm run build`: Build the application for production

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile
- `PUT /api/v1/auth/updatedetails` - Update user details
- `PUT /api/v1/auth/updatepassword` - Update password

## Roles

The system supports the following roles:
- `farmer`: Regular user with basic access
- `agronomist`: Expert user with additional privileges
- `admin`: System administrator with full access

## Protected Routes

Use the `ProtectedRoute` component to protect routes that require authentication:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

For admin-only routes:

```jsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

## Error Handling

- 401: Unauthorized - Authentication required
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource not found
- 429: Too Many Requests - Rate limit exceeded
- 500: Internal Server Error - Something went wrong

## Security Considerations

- Always use HTTPS in production
- Keep JWT_SECRET and other sensitive data in environment variables
- Implement proper input validation
- Use rate limiting to prevent abuse
- Keep dependencies up to date
- Use secure, httpOnly cookies for session management

## Testing

Test the authentication flow by:
1. Registering a new user
2. Logging in with the new credentials
3. Accessing protected routes
4. Testing role-based access control
5. Verifying token expiration and refresh logic
