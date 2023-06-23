import dayjs from 'dayjs';
import store from '@/store';
import { useI18n } from '@/hooks/use-i18n';
import styles from './styles.module.css';
export const Minted = () => {
  const [{ publicStartTime }] = store.useModel('onchain');
  const [{ time }] = store.useModel('i18n');
  const translate = useI18n();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>{translate.get('nftwebsite_thankyou')}</div>
        <div className={styles.content}>{translate.get('nftwebsite_zhu_76')}</div>
      </div>
      <div className={styles.nftBox}></div>
    </div>
  );
};
