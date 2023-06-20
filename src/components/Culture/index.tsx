import { useRef } from 'react';
import { Banner } from '../Banner';
import { PageInfo } from '../PageInfo';
import { useAnimation } from '@/hooks/use-animation';
import styles from './styles.module.css';
import { useI18n } from '@/hooks/use-i18n';
import { sendEvent } from '@/utils/aemTracker';

export const Culture = ({ pageIdx }: { pageIdx?: string }) => {
  const refs = useAnimation({
    pageInfo: { heightOffsetRatio: 0.75, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    btnWrapper: { heightOffsetRatio: 0.9, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    picture: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  return (
    <>
      <div className={styles.pageWrapper} id={pageIdx}>
        <div className={styles.container}>
          <div className={styles.blooming}></div>
          <div className={styles.backgroundDots}></div>
          <div className={styles.leftSide}>
            <PageInfo
              title={translate.get('nft_whitepaper')}
              subtitle={translate.get('nftwebsite_culture.subtitle')}
              desc={[translate.get('nftwebsite_culture.story1'), translate.get('nftwebsite_culture.story2')]}
              icon={{
                img: 'https://img.alicdn.com/imgextra/i2/O1CN01O5quAb1jY4VtZgBom_!!6000000004559-2-tps-72-72.png',
                url: 'https://themoment3.ai/The Moment3! Whitepaper.pdf',
              }}
              ref={refs['pageInfo']}
              pos={'Whitepaper'}
            />
            <a href="https://discord.gg/themoment3" target="_blank">
              <div
                className={styles.btnWrapper}
                ref={refs['btnWrapper']}
                onClick={() => sendEvent('PC_Discord_Whitepaper')}
              >
                <div className={styles.icon}></div>
                <span>{translate.get('nftwebsite_introduc.JoinDiscord')}</span>
              </div>
            </a>
          </div>
          <div className={styles.picture} ref={refs['picture']}></div>
        </div>
      </div>
      <Banner />
    </>
  );
};
