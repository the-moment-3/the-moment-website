import { Link } from '@ice/runtime';
import { StepStatus } from '@/constants/freeMintSteps';
import { useI18n } from '@/hooks/use-i18n';
import { FreeMintAndPublicSale, Minted, StepOne, StepTwo } from './components';
import styles from './styles.module.css';
import { sumEvent } from '@/utils/arms';

export const FreeMintSteps = ({ status }: { status: StepStatus }) => {
  const translate = useI18n();
  const StepConfig = {
    [StepStatus.TASK_IN_PROGRESS]: [<StepOne status={status} />, <StepTwo status={status} />],

    [StepStatus.TASK_COMPLETED]: [<StepOne status={status} />, <StepTwo status={status} />],

    [StepStatus.TASK_NOT_COMPLETED]: [<StepOne status={status} />, <StepTwo status={status} />],

    [StepStatus.LOST]: [<StepOne status={status} />, <StepTwo status={status} />],

    [StepStatus.WIN]: [<FreeMintAndPublicSale status={status} key={StepStatus.WIN} />],

    [StepStatus.MINTED]: [<Minted key={StepStatus.MINTED} />],

    [StepStatus.PUBLIC_SALE]: [<FreeMintAndPublicSale status={status} key={StepStatus.PUBLIC_SALE} />],
    [StepStatus.FREE_MINT_FOR_ALL]: [<FreeMintAndPublicSale status={status} key={StepStatus.FREE_MINT_FOR_ALL} />],
  };

  return (
    <div className={styles.stepContainer}>
      {StepConfig[status].map((step, index) => {
        if ([StepStatus.WIN, StepStatus.FREE_MINT_FOR_ALL, StepStatus.MINTED].includes(status)) {
          return step;
        } else {
          return (
            <div className={styles.step} key={index}>
              <div className={styles.stepHeader}>
                <div className={styles.title}>{`STEP ${index + 1}`}</div>
                <div className={styles.info}>
                  {!index ? (
                    <>
                      <div>{translate.get('nftwebsite_tasks.allowlist')}</div>
                      <Link to={'/rules'}>
                        <div className={styles.questionIcon} onClick={() => sumEvent('PC_Rules_StepOne')}>
                          ?
                        </div>
                      </Link>
                    </>
                  ) : (
                    <div>{translate.get('nftwebsite_tasks.Lucky')}</div>
                  )}
                </div>
              </div>
              {step}
            </div>
          );
        }
      })}
    </div>
  );
};
