import { useRef } from 'react';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import { Banner } from '../Banner';
import { Gallery } from './componnets';
import styles from './styles.module.css';

export const Activity = ({ pageIdx }: { pageIdx?: string }) => {
  const refs = useAnimation({
    cooperationWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    btnWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();

  return (
    <>
      <div className={styles.pageWrapper} id={pageIdx}>
        <Gallery />
        <div className={styles.container}>
          <div className={styles.blooming}></div>
          <div className={styles.cooperationWrapper} ref={refs['cooperationWrapper']}>
            <div className={styles.logo}></div>
            <div className={styles.desc}>{translate.get('nftwebsite_introduc.time')}</div>
          </div>
          <a>
            <div className={styles.btnWrapper} ref={refs['btnWrapper']}>
              {translate.get('nft_Learnmore')}
            </div>
          </a>
        </div>
      </div>
      <Banner />
    </>
  );
};
