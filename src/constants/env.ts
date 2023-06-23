export const isBuilding = typeof window === 'undefined';
export const isProd = !isBuilding && /^(www\.)?themoment3\.ai$/.test(window.location.host);
export const isPre = !isBuilding && window.location.host === 'pre.themoment3.ai';
export const isDev = !isBuilding && !isProd && !isPre;

// 后端接口域名
export const HTTP_API_HOST = isProd ? 'https://api-web3.aliexpress.com' : 'https://pre-api-web3.aliexpress.com';
