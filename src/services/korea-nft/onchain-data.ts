import { request } from '@/utils/request';

export interface GetOnchainDataResponse {
  contractAddress: string; // NFT 智能合约地址
  collectionSize: number; // NFT 总数量
  perAddressMaxMintAmount: number; // 每个地址可以 mint 的最大数量
  totalMintedAmount: number; // 总共已经被铸造的数量
  taskFinishedCount: number; // 已经完成任务的总人数
  taskStartTime: number; // 任务开始时间
  taskEndTime: number; // 任务结束时间
  lotteryTime: number; // 抽奖时间
  allowListStartTime: number; // 白名单铸造开始时间（时间戳）
  allowListEndTime: number; // 白名单铸造结束时间（时间戳）
  allowListPrice: number; // 白名单价格（ETH）
  allowListCount: number; // 白名单总数量
  publicStartTime: number; // 公售开始时间（时间戳）
  publicPrice: number; // 公售价格（ETH）
  publicDisplayPrice: number; // 用于前端展示的公售价格（ETH）
}

export function getOnchainData() {
  return request<GetOnchainDataResponse>('/korea-nft/onchain-data');
}
