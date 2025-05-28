import axios from 'axios';
import {User} from '../context/AuthContext';
import {removeToken} from '../utils/authStorage';
import {showToast} from '../components/ToastMessage';
import config from '../../config/config';

export const BASE_URL = config.API_URL;

export const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}

export async function Login(email: string, password: string) {
  try {
    const res = await authAPI.post<AuthResponse>('/api/v1/auth/login', {
      email,
      password,
    });
    showToast('success', 'Success', 'Login successful');
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      (error.request
        ? 'Network error. Check your connection.'
        : 'Something went wrong.');
    showToast('error', 'Login Failed', message);
    throw new Error(message);
  }
}

export async function Register(name: string, email: string, password: string) {
  try {
    const response = await authAPI.post<AuthResponse>('/api/v1/auth/register', {
      name,
      email,
      password,
    });
    showToast('success', 'Success', 'Register successful');
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      (error.request
        ? 'Network error. Check your connection.'
        : 'Something went wrong.');
    showToast('error', 'Register Failed', message);
    throw new Error(message);
  }
}

export async function Logout() {
  try {
    const response = await authAPI.post<AuthResponse>('/api/v1/auth/logout');
    showToast('success', 'Success', 'Logout successful');
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      (error.request
        ? 'Network error. Check your connection.'
        : 'Something went wrong.');
    showToast('error', 'Logout Failed', message);
    throw new Error(message);
  }
}

export const validateToken = async (token: string) => {
  try {
    const response = await authAPI.get('/api/v1/verifytoken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    showToast('success', 'Success', 'Welcome back');
    return {
      valid: true,
      user: response.data.user,
    };
  } catch (error: any) {
    await removeToken();
    const message =
      error.response?.data?.message ||
      (error.request
        ? 'Network error. Check your connection.'
        : 'Something went wrong.');
    showToast('error', 'Token Invalid', message);
    return {
      valid: false,
      error: 'Token invalid/expired',
    };
  }
};
