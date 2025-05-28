import axios from 'axios';
import {BASE_URL} from './authAPI';
import {getToken} from '../utils/authStorage';
import {debugError, debugLog, debugWarn} from '../../config/config';

export const feedAPI = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export interface Quote {
  _id: string;
  quote: string;
  author: string;
  category: string;
  user?: {
    name?: string;
    email?: string;
    _id?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FeedResponse {
  success: boolean;
  data: Quote[];
  pagination: PaginationMeta;
}

export interface FeedParams {
  page?: number;
  limit?: number;
}

export async function getFeed(params: FeedParams = {}) {
  try {
    const token = await getToken();
    if (!token) {
      debugWarn('No token found!');
      return;
    }

    const {page = 1, limit = 20} = params;

    const response = await feedAPI.get<FeedResponse>('/api/v1/quotes/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });

    debugLog('quotes feedAPI.ts', response.data);
    return response.data;
  } catch (error) {
    debugError('Feed API error:', error);
    throw error;
  }
}
