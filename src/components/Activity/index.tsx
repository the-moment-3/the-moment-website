import { useRef } from 'react';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import { getPageIdByLink } from '@/utils/nav';
import { Banner } from '../Banner';
import { Gallery } from './componnets';
import styles from './styles.module.css';
import { Link } from '@ice/runtime';
import { sendEvent } from '@/utils/aes';

export const Activity = () => {
  const refs = useAnimation({
    cooperationWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    btnWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  return (
    <>
      <div className={styles.pageWrapper} id={getPageIdByLink('/season_one')}>
        <Gallery />
        <div className={styles.container}>
          <div className={styles.blooming}></div>
          <div className={styles.cooperationWrapper} ref={refs['cooperationWrapper']}>
            <div className={styles.logo}></div>
            <div className={styles.desc}>{translate.get('nftwebsite_introduc')}</div>
          </div>
          <Link to={'/rules'}>
            <div className={styles.btnWrapper} ref={refs['btnWrapper']} onClick={() => sendEvent('PC_Rules_Vision')}>
              {translate.get('nft_Learnmore')}
            </div>
          </Link>
        </div>
      </div>
      <Banner />
    </>
  );
};
