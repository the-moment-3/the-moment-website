import { mediaList } from '@/constants/media';
import { useI18n } from '@/hooks/use-i18n';
import { MediaIcon } from '../MediaIcon';
import styles from './styles.module.css';

const agreementList = [
  {
    name: 'Privacy Policy',
    url: 'https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20230626220436219/20230626220436219.html',
  },
  {
    name: 'Terms of Use',
    url: 'https://terms.alicdn.com/legal-agreement/terms/b_platform_service_agreement/20230626222830775/20230626222830775.html',
  },
];

export const Footer = () => {
  const translate = useI18n();
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.container}>
        <div className={styles.followUsMobile}>
          <div className={styles.title}>{translate.get('nftwebsite_dibu.Followus')}</div>
          <MediaIcon mediaList={mediaList} size={32} bgc={'#3d3d3d'} pos={'Footer'} />
        </div>
        <div className={styles.copyrightWrapper}>
          <div className={styles.copyright}>{translate.get('nftwebsite_dibu.metaverse')}</div>
          <div className={styles.signature}>{translate.get('nftwebsite_dibu.2023')}</div>
          <div className={styles.agreementWrapper}>
            {agreementList.map((agreement) => {
              return (
                <a href={agreement.url} target="_blank">
                  <div className={styles.agreement} key={agreement.name}>
                    {agreement.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
