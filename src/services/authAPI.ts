import axios from 'axios';
import {User} from '../context/AuthContext';

const BASE_URL = process.env.API_URL;

export const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export interface AuthResponse {
  [x: string]: any; // to fix type error
  token: string;
  user: User;
}

export async function Login(email: string, password: string) {
  const response = await authAPI.post<AuthResponse>('/api/v1/auth/login', {
    email,
    password,
  });
  return response.data;
}

export async function Register(name: string, email: string, password: string) {
  const response = await authAPI.post<AuthResponse>('/api/v1/auth/register', {
    name,
    email,
    password,
  });
  return response.data;
}
