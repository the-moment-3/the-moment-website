import { request } from '@/utils';

interface MintChannelData {
  txHash: string;
  value: number;
  mintAmount: number;
  channelCode: string;
}

export function mintChannel(data: MintChannelData) {
  return request('/korea-nft/mint-channel', { method: 'POST', data });
}
