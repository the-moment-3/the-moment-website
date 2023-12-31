import { useEffect } from 'react';
import { Footer, FreeMintSteps, Header, WinnerListBtn } from '@/components';
import { NOW } from '@/constants/time';
import { StepStatus } from '@/constants/freeMintSteps';
import { useStepStatus } from '@/hooks/use-step-status';
import { useI18n } from '@/hooks/use-i18n';
import store from '@/store';
import styles from './index.module.css';

export default () => {
  const [onchainData] = store.useModel('onchain');
  const [{ lotteryWinnerList }] = store.useModel('task');
  const currStepStatus = useStepStatus(NOW, onchainData);
  const translate = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container} data-testid={currStepStatus}>
        {[StepStatus.WIN, StepStatus.MINTED, StepStatus.FREE_MINT_FOR_ALL].includes(currStepStatus) ? (
          currStepStatus === StepStatus.FREE_MINT_FOR_ALL ? (
            <div className={styles.mintTop}>
              <div className={styles.imgWrapper}>
                <img
                  src="https://img.alicdn.com/imgextra/i4/O1CN01VVxB1620tSTMdL7Pz_!!6000000006907-2-tps-560-55.png"
                  alt="cooperation"
                />
              </div>
              <div className={styles.pageInfo}>{translate.get('nftwebsite_tasks.Complete')}</div>
            </div>
          ) : (
            <div className={styles.mintTop}>
              <div className={styles.title}>
                <span>{translate.get('nftwebsite_Congratulate.lucky')}</span>
              </div>
              {/* <WinnerListBtn winnerList={lotteryWinnerList} cln={styles.winnerList} /> */}
            </div>
          )
        ) : (
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <div className={styles.title}>
                <img
                  src="https://img.alicdn.com/imgextra/i4/O1CN01VVxB1620tSTMdL7Pz_!!6000000006907-2-tps-560-55.png"
                  alt="cooperation"
                />
              </div>
              <div className={styles.pageInfo}>{translate.get('nftwebsite_tasks.Complete')}</div>
            </div>

            <div className={styles.topRight}>
              <div className={styles.nftBox}></div>
              <div className={styles.processInfo}>
                <div className={styles.remainder}>
                  {translate.get('nft_home_qualified', '', {
                    0: onchainData.taskFinishedCount,
                  })}
                </div>

                <div className={styles.projectSize}>
                  {translate.get('nftwebsite_open.total0', '', { 0: onchainData.collectionSize })}
                </div>
              </div>
            </div>
          </div>
        )}
        <FreeMintSteps status={currStepStatus} />
        <Footer />
      </div>
    </div>
  );
};
