import { createModel } from 'ice';
import { GetTaskDataResponse, getTaskData } from '@/services/korea-nft/task-data';
import { GetLotteryWinnerListResponse, getLotteryWinnerList } from '@/services/korea-nft/lottery-winner-list';

type TaskData = GetTaskDataResponse & {
  lotteryWinnerList: GetLotteryWinnerListResponse;
};

export default createModel({
  state: {
    totalFinished: true,
    lotteryNumber: 0,
    lotteryWinnerList: [],
  } as TaskData,
  reducers: {
    update(state, payload: Partial<TaskData>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: () => ({
    async fetchTaskData() {
      try {
        const data = await getTaskData();
        this.update(data);
      } catch (e) {
        console.log('[models/task] fetchTaskData error:', e);
      }
    },
    async fetchLotteryWinnerList() {
      try {
        this.update({
          lotteryWinnerList: await getLotteryWinnerList(),
        });
      } catch (e) {
        console.log('[models/task] fetchLotteryWinnerList error:', e);
      }
    },
  }),
});
