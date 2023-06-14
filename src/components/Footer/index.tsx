import { mediaList } from '@/constants/media';
import { useI18n } from '@/hooks/use-i18n';
import { MediaIcon } from '../MediaIcon';
import styles from './styles.module.css';

export const Footer = () => {
  const translate = useI18n();
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.container}>
        <div className={styles.followUsMobile}>
          <div className={styles.title}>{translate.get('nftwebsite_dibu.Followus')}</div>
          <MediaIcon mediaList={mediaList} size={32} bgc={'#3d3d3d'} />
        </div>
        <div className={styles.copyrightWrapper}>
          <div className={styles.copyright}>{translate.get('nftwebsite_dibu.metaverse')}</div>
          <div className={styles.signature}>{translate.get('nftwebsite_dibu.2023')}</div>
        </div>
      </div>
    </div>
  );
};
