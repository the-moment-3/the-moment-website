import { LANGUAGES } from '@/constants/i18n';
import store from '@/store';

export default () => {
  const [i18n] = store.useModel('i18n');
  const imgSrc = {
    [LANGUAGES.EN]: 'https://img.alicdn.com/imgextra/i4/O1CN01hYIz3T1iMKkWWSNyh_!!6000000004398-2-tps-3285-1350.png',
    [LANGUAGES.KO]: 'https://img.alicdn.com/imgextra/i4/O1CN01tTVB2m1SXINNrTnNU_!!6000000002256-2-tps-3285-1350.png',
  };

  return (
    <div
      className={'wrapper'}
      style={{
        width: '100vw',
        height: '100vh',
        background: `url(${imgSrc[i18n.lang]}) no-repeat center center`,
        backgroundSize: 'cover',
        backgroundColor: '#1c1c1b',
      }}
    ></div>
  );
};
