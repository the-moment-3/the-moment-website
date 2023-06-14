export const isBuilding = typeof window === 'undefined';

export const isProd = !isBuilding && window.location.host === 'de-moment.ai';

export const isPre = !isBuilding && window.location.host === 'pre-www.de-moment.ai';

export const isDev = !isProd && !isPre;

export const HTTP_API_HOST = isProd ? 'https://api-web3.aliexpress.com' : 'https://pre-api-web3.aliexpress.com';
