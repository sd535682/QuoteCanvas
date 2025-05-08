import axios from 'axios';
import {User} from '../context/AuthContext';

const BASE_URL = process.env.API_URL;

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
  const response = await authAPI.post<AuthResponse>('/api/v1/auth/login', {
    email,
    password,
  });
  console.log(response.data);
  return response.data;
}

export async function Register(name: string, email: string, password: string) {
  const response = await authAPI.post<AuthResponse>('/api/v1/auth/register', {
    name,
    email,
    password,
  });
  console.log(response.data);
  return response.data;
}

export async function Logout() {
  const response = await authAPI.post<AuthResponse>('/api/v1/auth/logout');
  console.log(response.data);
  return response.data;
}
