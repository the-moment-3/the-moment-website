import { useRef } from 'react';
import { PageInfo } from '../PageInfo';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import { Media } from '@/constants/media';
import { MediaIcon } from '../MediaIcon';
import styles from './styles.module.css';

export interface Member {
  name?: string;
  position?: string;
  avatar?: string;
  twitter?: Media;
  linkedin?: Media;
}

export const Team = ({ pageIdx }: { pageIdx?: string }) => {
  const refs = useAnimation({
    pageInfo: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
    membersWrapper: { heightOffsetRatio: 0.8, className: styles.fadeIn, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  const members: Member[] = [
    {
      name: translate.get('nftwebsite_team.Cobe'),
      position: translate.get('nftwebsite_team.Founder'),
      avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01kVZqqG22OQsVitnak_!!6000000007110-2-tps-576-230.png',
    },
    {
      name: translate.get('nftwebsite_team.Pallas'),
      position: translate.get('nftwebsite_team.Artist'),
      avatar: 'https://img.alicdn.com/imgextra/i2/O1CN01I9wCQl1gzbTX3LJQ2_!!6000000004213-2-tps-576-230.png',
      twitter: {
        name: 'Twitter',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
        hoverIcon: 'https://img.alicdn.com/imgextra/i2/O1CN01fyyEyc1t293WdfTKQ_!!6000000005843-2-tps-96-96.png',
        url: 'https://www.twitter.com/wongwangwung',
      },
      linkedin: {
        name: 'Linkedin',
        icon: 'https://img.alicdn.com/imgextra/i3/O1CN01ZklXjn1ymvb8oO6tM_!!6000000006622-2-tps-200-200.png',
        hoverIcon: 'https://img.alicdn.com/imgextra/i3/O1CN01nvMDfe1hPi3MXn8Yq_!!6000000004270-2-tps-200-200.png',
        url: 'https://www.linkedin.com/pallaswong',
      },
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
              return (
                <div
                  className={styles.memberInfo}
                  key={idx}
                  style={{ background: `url(${member.avatar}) no-repeat`, backgroundSize: 'contain' }}
                >
                  <div className={styles.info}>
                    <div className={styles.name}>{member.name}</div>
                    <div className={styles.position}>{member.position}</div>
                    {member.twitter && member.linkedin && (
                      <MediaIcon mediaList={[member.twitter, member.linkedin]} size={32} bgc={'#3d3d3d'} />
                    )}
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
