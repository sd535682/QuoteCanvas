import {getToken} from '../utils/authStorage';
import {feedAPI, Quote} from './feedAPI';

export interface MyQuotesResponse {
  success: boolean;
  data: Quote[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface MyQuotesParams {
  page?: number;
  limit?: number;
}

export async function getMyQuotes(params: MyQuotesParams = {}) {
  try {
    const token = await getToken();
    if (!token) {
      console.warn('No token found!');
      return;
    }

    const {page = 1, limit = 20} = params;

    const response = await feedAPI.get<MyQuotesResponse>('/api/v1/quotes/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });
    console.log('My Quotes', response.data);
    return response.data;
  } catch (error) {
    console.log('My Quotes API error:', error);
    throw error;
  }
}

export interface DeleteQuoteResponse {
  success: boolean;
}

export async function deleteQuote(id: string) {
  try {
    const token = await getToken();
    if (!token) {
      console.warn('No token found!');
      return {success: false};
    }

    const response = await feedAPI.delete(`/api/v1/quotes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('Delete Quote API error:', error);
    throw error;
  }
}
