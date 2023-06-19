import { useRef } from 'react';
import { Banner } from '../Banner';
import { PageInfo } from '../PageInfo';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import styles from './styles.module.css';

// mds

export const Team = ({ pageIdx }: { pageIdx?: string }) => {
  const refs = useAnimation({
    pageInfo: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    membersWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  const members = [
    {
      name: translate.get('nftwebsite_team.Cobe'),
      position: translate.get('nftwebsite_team.Founder'),
      avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01kVZqqG22OQsVitnak_!!6000000007110-2-tps-576-230.png',
    },
    {
      name: translate.get('nftwebsite_team.Pallas'),
      position: translate.get('nftwebsite_team.Artist'),
      avatar: 'https://img.alicdn.com/imgextra/i2/O1CN01I9wCQl1gzbTX3LJQ2_!!6000000004213-2-tps-576-230.png',
    },
    {
      name: 'Allini',
      position: `AI ${translate.get('nftwebsite_team.Artist')}`,
      avatar: 'https://img.alicdn.com/imgextra/i1/O1CN01hHAUcz1QkSWk281BI_!!6000000002014-2-tps-576-230.png',
    },
    {
      name: translate.get('nftwebsite_team.CryptoBear'),
      position: translate.get('nftwebsite_team.Tech'),
      avatar: 'https://img.alicdn.com/imgextra/i1/O1CN017UdJuJ1m7SLJIXnpr_!!6000000004907-2-tps-576-230.png',
      twitter: 'https://twitter.com/cryptobear_cn',
    },
    {
      name: translate.get('nftwebsite_team.Silver'),
      position: translate.get('nftwebsite_team.Project'),
      avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01DoYcvQ1ez1kIanytN_!!6000000003941-2-tps-576-230.png',
    },
    {
      name: translate.get('nftwebsite_team.MaggieC'),
      position: translate.get('nftwebsite_team.Operations'),
      avatar: 'https://img.alicdn.com/imgextra/i1/O1CN010T82Gu1e4h1wYXuql_!!6000000003818-2-tps-576-230.png',
    },
  ];
  return (
    <>
      <div className={styles.pageWrapper} id={pageIdx}>
        <div className={styles.container}>
          <div className={styles.blooming1}></div>
          <div className={styles.blooming2}></div>
          <div className={styles.contentWrapper}>
            <PageInfo
              title={translate.get('nftwebsite_team.Theteam')}
              desc={[translate.get('nftwebsite_team.Teamunitesveterans')]}
              ref={refs['pageInfo']}
            />
          </div>
          <div className={styles.membersWrapper} ref={refs['membersWrapper']}>
            {members.map((member, idx) => {
              return member.twitter ? (
                <a
                  className={styles.memberInfo}
                  key={idx}
                  style={{ background: `url(${member.avatar}) no-repeat`, backgroundSize: 'contain' }}
                  href={member.twitter}
                  target="_blank"
                >
                  <div className={styles.info}>
                    <div className={styles.name}>{member.name}</div>
                    <div className={styles.position}>{member.position}</div>
                  </div>
                </a>
              ) : (
                <div
                  className={styles.memberInfo}
                  key={idx}
                  style={{ background: `url(${member.avatar}) no-repeat`, backgroundSize: 'contain' }}
                >
                  <div className={styles.info}>
                    <div className={styles.name}>{member.name}</div>
                    <div className={styles.position}>{member.position}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
