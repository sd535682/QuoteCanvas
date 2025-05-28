import axios from 'axios';
import {BASE_URL} from './authAPI';
import {getToken} from '../utils/authStorage';
import {debugError, debugLog, debugWarn} from '../../config/config';

export const quoteAPI = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

export interface CreateQuote {
  quote: string;
  author: string;
  category: string;
}

export async function createQuote(quote: CreateQuote) {
  try {
    const token = await getToken();
    if (!token) {
      debugWarn('No token found!');
      return;
    }

    const response = await quoteAPI.post(
      '/api/v1/quotes',
      {
        quote: quote.quote,
        author: quote.author,
        category: quote.category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    debugLog('quote created', response.data);
    return response.data;
  } catch (error) {
    debugError('Quote API error:', error);
    throw error;
  }
}
