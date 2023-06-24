import { StepStatus } from '@/constants/freeMintSteps';
import { OnchainData } from '@/models/onchain';
import store from '@/store';
import dayjs from 'dayjs';

export const useStepStatus = (now: number | dayjs.Dayjs, onchainData: OnchainData): StepStatus => {
  const [taskData] = store.useModel('task');
  if (!onchainData.collectionSize) return StepStatus.TASK_IN_PROGRESS;
  //before task end
  if (dayjs(now).diff(onchainData.taskEndTime) < 0) {
    if (onchainData?.allowListTotalAmount > 0) {
      return StepStatus.TASK_COMPLETED;
    } else {
      return taskData.totalFinished ? StepStatus.TASK_COMPLETED : StepStatus.TASK_IN_PROGRESS;
    }
    //after task end and before release winner list
  } else if (dayjs(now).diff(onchainData?.lotteryTime) < 0) {
    if (onchainData?.allowListTotalAmount > 0) {
      return StepStatus.TASK_COMPLETED;
    } else {
      return taskData.totalFinished ? StepStatus.TASK_COMPLETED : StepStatus.TASK_NOT_COMPLETED;
    }
    //after release winner list and before end of allow list mint
  } else if (dayjs(now).diff(onchainData?.allowListEndTime) < 0) {
    if (!onchainData?.allowListTotalAmount) {
      return taskData.totalFinished ? StepStatus.LOST : StepStatus.TASK_NOT_COMPLETED;
    } else {
      return onchainData?.addressMintedAmount ? StepStatus.MINTED : StepStatus.WIN;
    }
    //after end of allow list mint
  } else {
    return StepStatus.FREE_MINT_FOR_ALL;
  }
};
