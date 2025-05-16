import {getToken} from '../utils/authStorage';
import {feedAPI} from './feedAPI';

export interface Quote {
  _id: string;
  quote: string;
  author: string;
  category: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyQuotesResponse {
  success: boolean;
  data: Quote[];
}

export async function getMyQuotes() {
  try {
    const token = await getToken();
    if (!token) {
      console.warn('No token found!');
      return;
    }

    const response = await feedAPI.get<MyQuotesResponse>('/api/v1/quotes/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('My Quotes', response.data);
    return response.data;
  } catch (error) {
    console.log('My Quotes API error:', error);
  }
}
