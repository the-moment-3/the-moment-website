import store from '@/store';
import { Header } from '@/components';
import { navAnchor } from '@/utils/nav';
import { LANGUAGES } from '@/constants/i18n';

export default () => {
  const [i18n] = store.useModel('i18n');
  const imgSrc = {
    [LANGUAGES.EN]: 'https://img.alicdn.com/imgextra/i1/O1CN018qYfbI1IAihKVzATc_!!6000000000853-2-tps-3285-1350.png',
    [LANGUAGES.KO]: 'https://img.alicdn.com/imgextra/i4/O1CN01gO6kuf1Z7pfPVrzx6_!!6000000003148-2-tps-3285-1350.png',
  };

  return (
    <div
      className={'wrapper'}
      style={{
        width: '100vw',
        height: '100vh',
        background: `#1c1c1b url(${imgSrc[i18n.lang]})  center center/cover no-repeat`,
      }}
    >
      <Header />
    </div>
  );
};
