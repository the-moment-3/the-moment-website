import { LANGUAGES } from '@/constants/i18n';
import store from '@/store';
import styles from './index.module.css';

export default () => {
  const [i18n] = store.useModel('i18n');

  const imgSrc = {
    [LANGUAGES.EN]: 'https://img.alicdn.com/imgextra/i4/O1CN01ppk1bs1FlPZqayNXn_!!6000000000527-2-tps-988-597.png',
    [LANGUAGES.KO]: 'https://img.alicdn.com/imgextra/i1/O1CN01RD6ikS1qMLgetqCDN_!!6000000005481-2-tps-988-597.png',
  };

  return (
    <div className={styles.wrapper}>
      <img src={imgSrc[i18n.lang]} />
    </div>
  );
};
