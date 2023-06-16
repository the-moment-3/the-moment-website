import { useEffect } from 'react';
import store from '@/store';
import { Footer, FreeMintSteps, Header, WinnerListBtn } from '@/components';
import { navAnchor } from '@/constants/home';
import { NOW } from '@/constants/time';
import { StepStatus } from '@/constants/freeMintSteps';
import { useStepStatus } from '@/hooks/use-step-status';
import styles from './mint.module.css';
import { useI18n } from '@/hooks/use-i18n';

export default () => {
  const [onchainData] = store.useModel('onchain');
  const currStepStatus = useStepStatus(NOW, onchainData);
  const translate = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header navAnchor={navAnchor} />
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
              <WinnerListBtn winnerList={[]} cln={styles.winnerList} />
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
                <div className={styles.remainder}>{`Only ${5000 - onchainData.publicMintedAmount} left`}</div>
                <div className={styles.projectSize}>{`Project size: 5000`}</div>
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
