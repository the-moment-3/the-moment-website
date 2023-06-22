import { request } from '@/utils/request';
import { SiweMessage } from 'siwe';

export function getSiweSession() {
  return request<SiweMessage>('/ethereum/siwe/session');
}

export function getSiweNonce() {
  return request<string>('/ethereum/siwe/nonce');
}

export function siweVerify(message: string, signature: string) {
  return request<SiweMessage>('/ethereum/siwe/verify', {
    method: 'POST',
    data: { message, signature },
  });
}

export function siweClear() {
  return request('/ethereum/siwe/clear', { method: 'POST' });
}
