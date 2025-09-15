const { verifyToken } = require('../utils/jwt');

const ROLES = {
  FARMER: 'farmer',
  AGRONOMIST: 'agronomist',
  ADMIN: 'admin'
};

const auth = (requiredRoles = []) => {
  return (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ 
          success: false, 
          message: 'No authentication token, authorization denied' 
        });
      }

      // Verify token
      const decoded = verifyToken(token);
      req.user = decoded;

      // Check if user has required role
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ 
          success: false, 
          message: 'You do not have permission to access this resource' 
        });
      }

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ 
        success: false, 
        message: 'Token is not valid or has expired' 
      });
    }
  };
};

module.exports = {
  auth,
  ROLES
};
