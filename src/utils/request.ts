import { request as iceRequest } from 'ice';
import { HTTP_API_HOST } from '@/constants';
import store from '@/store';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
}

export interface Response<T> {
  success?: boolean;
  data?: T;
  errorCode?: string;
  errorMsg?: string;
  showType?: number;
  traceId?: string;
  host?: string;
}

export async function request<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method, data, headers } = options;
  const {
    success,
    errorMsg,
    data: responseData,
  } = await iceRequest<Response<T>>({
    url: HTTP_API_HOST + url,
    method: method || 'GET',
    data,
    withCredentials: true,
    headers: {
      ...headers,
      'content-type': 'application/json',
      'ethereum-address': store.getModelState('wallet').address,
    },
  });
  if (!success) throw new Error(errorMsg);
  return responseData as T;
}
