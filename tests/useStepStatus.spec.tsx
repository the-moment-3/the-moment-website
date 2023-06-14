import dayjs from 'dayjs';
import { StepStatus } from '../src/constants/freeMintSteps';
import { useStepStatus } from '../src/hooks/use-step-status';
import store from '../src/store';

jest.mock('@/store', () => ({ useModel: jest.fn() }));

describe('FreeMintSteps status', () => {
  it.each`
    caseId                | totalFinished | allowListRemainAmount | addressMintedAmount | now                            | result
    ${'[free-mint-0001]'} | ${false}      | ${0}                  | ${0}                | ${dayjs('2023-6-28T14:00:00')} | ${StepStatus.TASK_IN_PROGRESS}
    ${'[free-mint-0002]'} | ${true}       | ${0}                  | ${0}                | ${dayjs('2023-6-28T14:00:00')} | ${StepStatus.TASK_COMPLETED}
    ${'[free-mint-0003]'} | ${false}      | ${3}                  | ${0}                | ${dayjs('2023-6-28T14:00:00')} | ${StepStatus.TASK_COMPLETED}
    ${'[free-mint-0004]'} | ${true}       | ${3}                  | ${0}                | ${dayjs('2023-6-28T14:00:00')} | ${StepStatus.TASK_COMPLETED}
    ${'[free-mint-0005]'} | ${false}      | ${0}                  | ${0}                | ${dayjs('2023-7-6T8:00:01')}   | ${StepStatus.TASK_NOT_COMPLETED}
    ${'[free-mint-0006]'} | ${true}       | ${0}                  | ${0}                | ${dayjs('2023-7-6T8:00:01')}   | ${StepStatus.TASK_COMPLETED}
    ${'[free-mint-0007]'} | ${false}      | ${3}                  | ${0}                | ${dayjs('2023-7-6T8:00:01')}   | ${StepStatus.TASK_COMPLETED}
    ${'[free-mint-0008]'} | ${true}       | ${3}                  | ${0}                | ${dayjs('2023-7-6T8:00:01')}   | ${StepStatus.TASK_COMPLETED}
    ${'[free-mint-0009]'} | ${true}       | ${0}                  | ${0}                | ${dayjs('2023-7-6T14:00:01')}  | ${StepStatus.LOST}
    ${'[free-mint-0010]'} | ${true}       | ${1}                  | ${0}                | ${dayjs('2023-7-6T14:00:00')}  | ${StepStatus.WIN}
    ${'[free-mint-0011]'} | ${true}       | ${1}                  | ${1}                | ${dayjs('2023-7-6T14:00:00')}  | ${StepStatus.MINTED}
    ${'[free-mint-0012]'} | ${true}       | ${1}                  | ${0}                | ${dayjs('2023-7-7T14:00:00')}  | ${StepStatus.PUBLIC_SALE}
  `(
    'Should be in the correct status depends on the status of task by the task end date. $caseId',
    ({ totalFinished, allowListRemainAmount, now, addressMintedAmount, result }) => {
      store.useModel.mockImplementation(() => [{ totalFinished }]);
      const onchain = {
        taskEndTime: dayjs('2023-7-6').valueOf(),
        allowListStartTime: dayjs('2023-7-6T14').valueOf(),
        allowListEndTime: dayjs('2023-7-7T14').valueOf(),
        publicStartTime: dayjs('2023-7-7T14').valueOf(),
        addressMintedAmount: addressMintedAmount,
        allowListRemainAmount: allowListRemainAmount,
      };
      expect(useStepStatus(now, onchain)).toBe(result);
    },
  );
});
