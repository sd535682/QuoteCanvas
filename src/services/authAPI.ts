import axios from 'axios';
import {User} from '../context/AuthContext';
import {removeToken} from '../utils/authStorage';
import {Alert} from 'react-native';

export const BASE_URL = process.env.API_URL;

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
    const response = await authAPI.post<AuthResponse>('/api/v1/auth/login', {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    Alert.alert('Login failed', error.response.data.message);
    throw error.response.data.message;
  }
}

export async function Register(name: string, email: string, password: string) {
  try {
    const response = await authAPI.post<AuthResponse>('/api/v1/auth/register', {
      name,
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    Alert.alert('Register failed', error.response.data.message);
    throw error.response.data.message;
  }
}

export async function Logout() {
  const response = await authAPI.post<AuthResponse>('/api/v1/auth/logout');
  console.log(response.data);
  return response.data;
}

export const validateToken = async (token: string) => {
  try {
    const response = await authAPI.get('/api/v1/verifytoken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response.data', response.data);
    return {
      valid: true,
      user: response.data.user,
    };
  } catch (error) {
    await removeToken();
    console.log('authAPI error', error);
    return {
      valid: false,
      error: 'Token invalid/expired',
    };
  }
};
