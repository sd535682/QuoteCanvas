import axios from 'axios';
import {BASE_URL} from './authAPI';
import {getToken} from '../utils/authStorage';

export const feedAPI = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export interface Quote {
  _id: string;
  quote: string;
  author: string;
  category: string;
  user: {
    name: string;
    email: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeedResponse {
  success: boolean;
  data: Quote[];
}

export async function getFeed() {
  try {
    const token = await getToken();
    if (!token) {
      console.warn('No token found!');
      return;
    }

    const response = await feedAPI.get<FeedResponse>('/api/v1/quotes/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('quotes feedAPI.ts', response.data);
    return response.data;
  } catch (error) {
    console.log('Feed API error:', error);
  }
}
