import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    phone?: string;
  };
}

class AuthService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include auth token
  constructor() {
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  }

  async register(name: string, email: string, password: string, role: string): Promise<void> {
    try {
      await this.api.post('/auth/register', { name, email, password, role });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  }

  async initiatePhoneAuth(phoneNumber: string): Promise<{ verificationId: string }> {
    try {
      const response = await this.api.post<{ verificationId: string }>('/auth/phone/initiate', {
        phoneNumber,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to initiate phone authentication.');
    }
  }

  async verifyPhoneOtp(verificationId: string, otp: string): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>('/auth/phone/verify', {
        verificationId,
        otp,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed.');
    }
  }

  async getUserProfile(userId: string) {
    try {
      const response = await this.api.get(`/users/${userId}/profile`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile.');
    }
  }

  async updateUserProfile(userId: string, userData: any) {
    try {
      const response = await this.api.patch(`/users/${userId}/profile`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile.');
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await this.api.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to send password reset email. Please try again.'
      );
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await this.api.post('/auth/reset-password', { token, newPassword });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to reset password. The link may have expired.'
      );
    }
  }
}

export const authService = new AuthService();
