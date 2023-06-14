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
      name: translate.get('nftwebsite_team.Pallas'),
      position: translate.get('nftwebsite_team.Artist'),
      avatar: 'avatar1',
    },
    {
      name: translate.get('nftwebsite_team.CryptoBear'),
      position: translate.get('nftwebsite_team.Tech'),
      avatar: 'avatar2',
    },
    {
      name: translate.get('nftwebsite_team.Silver'),
      position: translate.get('nftwebsite_team.Project'),
      avatar: 'avatar3',
    },
    {
      name: translate.get('nftwebsite_team.Cobe'),
      position: translate.get('nftwebsite_team.Founder'),
      avatar: 'avatar4',
    },
    {
      name: translate.get('nftwebsite_team.MaggieC'),
      position: translate.get('nftwebsite_team.Operations'),
      avatar: 'avatar5',
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
              return (
                <div className={styles.memberInfo} key={idx}>
                  <div className={styles.info}>
                    <div className={styles.name}>{member.name}</div>
                    <div className={styles.position}>{member.position}</div>
                  </div>
                  {/* <div className={styles.avatar}></div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
