import { useRef } from 'react';
import { PageInfo } from '../PageInfo';
import { Banner } from '@/components/';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import styles from './styles.module.css';

const partners = [
  {
    name: 'The Moment3 1',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
  },
  {
    name: 'The Moment3 2',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
  },
  {
    name: 'The Moment3 3',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
  },
  {
    name: 'The Moment3 4',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
  },
  {
    name: 'The Moment3 5',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
  },
  {
    name: 'The Moment3 6',
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
  },
];

export const Partner = ({ pageIdx }: { pageIdx?: string }) => {
  const refs = useAnimation({
    pageInfo: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    partnersWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  return (
    <div className={styles.pageWrapper} id={pageIdx}>
      <Banner />
      <div className={styles.container}>
        <div className={styles.blooming1}></div>
        <div className={styles.blooming2}></div>
        <div className={styles.contentWrapper}>
          <PageInfo
            title={translate.get('nftwebsite_partner.Partners')}
            desc={[translate.get('nftwebsite_partner.MeettheTeamBehindTheMoment3')]}
            ref={refs['pageInfo']}
          />
        </div>
        <div className={styles.partnersWrapper} ref={refs['partnersWrapper']}></div>
      </div>
    </div>
  );
};
