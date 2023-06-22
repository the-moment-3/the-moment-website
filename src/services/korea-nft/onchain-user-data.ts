import { request } from '@/utils/request';

export interface GetOnchainUserDataResponse {
  addressMintedAmount: number; // 用户已经铸造的数量
  allowListRemainAmount: number; // 用户剩余可用的白名单数量
  allowListTotalAmount: number; // 用户总共获得的白名单数量
  allowListMerkleProof: Buffer[]; // 用户白名单的默克尔树证明
}

export function getOnchainUserData() {
  return request<GetOnchainUserDataResponse>('/korea-nft/onchain-user-data');
}
