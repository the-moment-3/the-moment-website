import { request } from '@/utils/request';

export type GetLotteryWinnerListResponse = {
  lotteryNumber: number;
  ethereumAddress: string;
}[];

export function getLotteryWinnerList() {
  return request<GetLotteryWinnerListResponse>('/korea-nft/lottery-winner-list');
}
