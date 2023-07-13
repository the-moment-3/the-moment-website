import { mainnet, goerli } from 'wagmi/chains';
import { isProd } from './env';

export const chain = isProd ? mainnet : goerli;

export const chainId = chain.id;

export const walletConnectProjectId = 'd520d9ee9bda5c21f67275f25d777cef';

export const alchemyApiKey = 'XZVSdeY5vQ_7Z6SVU3oeGO3-wx1hoTaj'; // 前端专用 key
