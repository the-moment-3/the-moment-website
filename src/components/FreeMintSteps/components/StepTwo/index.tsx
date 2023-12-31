import cl from 'classnames';
import dayjs from 'dayjs';
import { WinnerListBtn } from '@/components/WinnerList';
import { StepStatus } from '@/constants/freeMintSteps';
import { useI18n } from '@/hooks/use-i18n';
import store from '@/store';
import styles from './styles.module.css';

export const StepTwo = ({ status }: { status: StepStatus }) => {
  const [{ allowListCount }] = store.useModel('onchain');
  const [{ lotteryWinnerList }] = store.useModel('task');
  const translate = useI18n();

  type StepContent = {
    [key in StepStatus]: {
      top: {
        content: string | undefined;
      }[];
      bottom: {
        title: string | undefined;
        content: string | number | undefined;
      };
    };
  };
  const getStepContent: StepContent = {
    [StepStatus.TASK_IN_PROGRESS]: {
      top: [
        {
          content: translate.get('nftwebsite_open.notqualified'),
        },
        {
          content: translate.get('nftwebsite_open.75'),
        },
      ],
      bottom: {
        title: translate.get('nftwebsite_tasks.winners1'),
        content: allowListCount,
      },
    },
    [StepStatus.TASK_COMPLETED]: {
      top: [
        {
          content: translate.get('nftwebsite_tasks.Eligible'),
        },
        {
          content: translate.get('nftwebsite_open.75'),
        },
      ],
      bottom: {
        title: translate.get('nftwebsite_tasks.winners1'),
        content: allowListCount,
      },
    },
    [StepStatus.TASK_NOT_COMPLETED]: {
      top: [
        {
          content: translate.get('nftwebsite_open.notqualified'),
        },
        {
          content: translate.get('nftwebsite_open.75'),
        },
      ],
      bottom: {
        title: translate.get('nftwebsite_overtime.havent'),
        content: translate.get('nftwebsite_thankyou'),
      },
    },
    [StepStatus.LOST]: {
      top: [
        {
          content: translate.get('nftwebsite_lost.Lost'),
        },
        {
          content: translate.get('nftwebsite_homepage_freemint_end_time'),
        },
      ],
      bottom: {
        title: translate.get('nftwebsite_lost.not'),
        content: translate.get('nftwebsite_thankyou'),
      },
    },
    [StepStatus.MINTED]: { top: [], bottom: { title: '', content: '' } },
    [StepStatus.WIN]: { top: [], bottom: { title: '', content: '' } },
    [StepStatus.PUBLIC_SALE]: { top: [], bottom: { title: '', content: '' } },
    [StepStatus.FREE_MINT_FOR_ALL]: { top: [], bottom: { title: '', content: '' } },
  };

  const stepContent = getStepContent[status];

  return (
    <>
      <div className={styles.top}>
        {stepContent.top.map((item, index) => {
          return (
            <div key={index}>
              <div className={styles.title}>
                {!index ? translate.get('nftwebsite_tasks.status') : translate.get('nftwebsite_tasks.Time')}
              </div>
              <div
                className={cl({
                  [styles.content]: index || status !== StepStatus.LOST,
                  [styles.lost]: !index && status === StepStatus.LOST,
                })}
              >
                {item.content}
                {/* {!index && status === StepStatus.LOST && (
                  <WinnerListBtn winnerList={lotteryWinnerList} cln={styles.winnerList} />
                )} */}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>{stepContent.bottom.title}</div>
        <div
          className={cl({
            [styles.content]: ![StepStatus.TASK_IN_PROGRESS, StepStatus.TASK_COMPLETED].includes(status),
            [styles.number]: [StepStatus.TASK_IN_PROGRESS, StepStatus.TASK_COMPLETED].includes(status),
          })}
        >
          {stepContent.bottom.content}
        </div>
      </div>
    </>
  );
};
