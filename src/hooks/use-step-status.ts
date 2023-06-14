import { StepStatus } from '@/constants/freeMintSteps';
import { OnchainData } from '@/models/onchain';
import store from '@/store';
import dayjs from 'dayjs';

export const useStepStatus = (now: string | dayjs.Dayjs, onchainData: OnchainData): StepStatus => {
  const [taskData] = store.useModel('task');
  //before task end
  if (dayjs(now).diff(onchainData.taskEndTime) < 0) {
    if (onchainData?.allowListRemainAmount > 0) {
      return StepStatus.TASK_COMPLETED;
    } else {
      return taskData.totalFinished ? StepStatus.TASK_COMPLETED : StepStatus.TASK_IN_PROGRESS;
    }
    //after task end and before release winner list
  } else if (dayjs(now).diff(onchainData?.lotteryTime) < 0) {
    if (onchainData?.allowListRemainAmount > 0) {
      return StepStatus.TASK_COMPLETED;
    } else {
      return taskData.totalFinished ? StepStatus.TASK_COMPLETED : StepStatus.TASK_NOT_COMPLETED;
    }
    //after release winner list and before public sale
  } else if (dayjs(now).diff(onchainData?.publicStartTime) < 0) {
    if (!onchainData?.allowListRemainAmount) {
      return StepStatus.LOST;
    } else {
      return onchainData?.addressMintedAmount ? StepStatus.MINTED : StepStatus.WIN;
    }
  } else {
    return StepStatus.PUBLIC_SALE;
  }
};
