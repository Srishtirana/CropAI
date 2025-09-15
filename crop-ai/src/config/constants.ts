// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth Constants
export const AUTH_TOKEN_KEY = 'crop_ai_token';
export const REFRESH_TOKEN_KEY = 'crop_ai_refresh_token';

// User Roles
export const USER_ROLES = {
  FARMER: 'farmer',
  EXPERT: 'expert',
  ADMIN: 'admin',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DIAGNOSE: '/diagnose',
  HISTORY: '/history',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND: '/404',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  INVALID_OTP: 'Invalid or expired OTP. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  REGISTRATION_SUCCESS: 'Registration successful! Please log in to continue.',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset email sent. Please check your inbox.',
  PASSWORD_RESET_SUCCESS: 'Password reset successful. You can now log in with your new password.',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[1-9]\d{9,14}$/,
};

// UI Constants
export const UI = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
  ITEMS_PER_PAGE: 10,
  DEBOUNCE_DELAY: 500, // ms
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_GOOGLE_AUTH: process.env.REACT_APP_ENABLE_GOOGLE_AUTH === 'true',
  ENABLE_PHONE_AUTH: process.env.REACT_APP_ENABLE_PHONE_AUTH === 'true',
  ENABLE_OFFLINE_MODE: process.env.REACT_APP_ENABLE_OFFLINE_MODE === 'true',
} as const;
