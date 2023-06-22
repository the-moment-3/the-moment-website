import { request } from '@/utils/request';

export interface GetTaskDataResponse {
  totalFinished: boolean; // 是否完成所有任务
  lotteryNumber?: number; // 抽奖编号
}

export function getTaskData() {
  return request<GetTaskDataResponse>('/korea-nft/task-data');
}
