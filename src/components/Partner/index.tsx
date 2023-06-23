import { useRef } from 'react';
import { PageInfo } from '../PageInfo';
import { Banner } from '@/components/';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import { getPageIdByLink } from '@/utils/nav';
import styles from './styles.module.css';

export const Partner = () => {
  const refs = useAnimation({
    pageInfo: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    partnersWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  return (
    <div className={styles.pageWrapper} id={getPageIdByLink('/partners')}>
      <Banner />
      <div className={styles.container}>
        <div className={styles.blooming1}></div>
        <div className={styles.blooming2}></div>
        <div className={styles.contentWrapper}>
          <PageInfo
            title={translate.get('nftwebsite_partner.Partners')}
            desc={[translate.get('nftwebsite_partner.holder')]}
            ref={refs['pageInfo']}
          />
        </div>
        <div className={styles.partnersWrapper} ref={refs['partnersWrapper']}></div>
      </div>
    </div>
  );
};
