import { isMobile } from 'react-device-detect';
import cl from 'classnames';
import { Link } from '@ice/runtime';
import { StepStatus } from '@/constants/freeMintSteps';
import { useI18n } from '@/hooks/use-i18n';
import { evoke } from '@/utils';
import store from '@/store';
import styles from './styles.module.css';

export const StepOne = ({ status }: { status: StepStatus }) => {
  const [taskData] = store.useModel('task');
  const translate = useI18n();

  const commonTaskStep = [
    `1. ${translate.get('nftwebsite_tasks.Complete1')}`,
    `2. ${translate.get('nftwebsite_tasks.number')}`,
  ];

  const completedTaskStep = [...commonTaskStep, translate.get('nftwebsite_qualified.qualified1')];
  type StepContent = {
    [key in StepStatus]: (string | undefined)[];
  };
  const getStepContent: StepContent = {
    [StepStatus.TASK_IN_PROGRESS]: commonTaskStep,
    [StepStatus.TASK_COMPLETED]: completedTaskStep,
    [StepStatus.TASK_NOT_COMPLETED]: [...commonTaskStep, `${translate.get('nftwebsite_overtime.Sorry')}`],
    [StepStatus.LOST]: completedTaskStep,
    [StepStatus.MINTED]: completedTaskStep,
    [StepStatus.WIN]: [],
    [StepStatus.PUBLIC_SALE]: [],
    [StepStatus.FREE_MINT_FOR_ALL]: [],
  };

  const handleClick = () => {
    const url = 'https://web3.aliexpress.com/korea-nft/home?_immersiveMode=true';
    evoke(`aliexpress://goto?url=${encodeURIComponent(url)}`, {
      fail: () => {
        evoke('https://s.click.aliexpress.com/i/_DlKspEL', {});
      },
    });
  };

  const stepContent = getStepContent[status];

  return (
    <div className={styles.stepContentWrapper}>
      {stepContent.map((content, idx, arr) => {
        return (
          <div className={styles.stepContent} key={idx}>
            <div className={styles.stepContentLeft}>
              <div className={styles.dot} />
              {idx !== arr.length - 1 && <div className={styles.verticalLine} />}
            </div>
            <div
              className={cl({
                [styles.stepContentRight]: status === StepStatus.TASK_IN_PROGRESS || idx !== arr.length - 1,
                [styles.stepSpecialLastOneForTimeOut]:
                  status === StepStatus.TASK_NOT_COMPLETED && idx === arr.length - 1,
                [styles.stepSpecialLastOneForLN]:
                  [StepStatus.TASK_COMPLETED, StepStatus.LOST].includes(status) && idx === arr.length - 1,
              })}
            >
              <div className={styles.content}>{content}</div>
              {[StepStatus.TASK_COMPLETED, StepStatus.LOST].includes(status) && idx === arr.length - 1 && (
                <div className={styles.luckyNumber}>{`# ${taskData.lotteryNumber}`}</div>
              )}
            </div>
          </div>
        );
      })}
      {status === StepStatus.TASK_IN_PROGRESS &&
        (!isMobile ? (
          <Link to={'/transfer'}>
            <div className={styles.goNowButton}>{translate.get('nftwebsite_open.gonow')}</div>
          </Link>
        ) : (
          <div className={styles.goNowButton} onClick={handleClick}>
            {translate.get('nftwebsite_open.gonow')}
          </div>
        ))}
      {[StepStatus.TASK_COMPLETED, StepStatus.LOST].includes(status) && <div className={styles.certification}></div>}
    </div>
  );
};
