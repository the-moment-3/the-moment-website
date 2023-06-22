export const isBuilding = typeof window === 'undefined';

export const isProd =
  !isBuilding && (window.location.host === 'themoment3.ai' || window.location.host === 'www.themoment3.ai');

export const isDev = !isProd;

// export const HTTP_API_HOST = isProd ? 'https://api-web3.aliexpress.com' : 'https://pre-api-web3.aliexpress.com';
export const HTTP_API_HOST = 'https://api-web3.aliexpress.com';
