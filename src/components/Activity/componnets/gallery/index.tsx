import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';

const nftImages = [
  'https://img.alicdn.com/imgextra/i4/O1CN01xglxo81VzdjMtdUeL_!!6000000002724-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN018OoFdn23zop43VPhz_!!6000000007327-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i2/O1CN017qJHHj1PvcYudZUHQ_!!6000000001903-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i1/O1CN012Q7Lrd1GR5cNKAfZS_!!6000000000618-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i2/O1CN01em29om1uBaqanimiv_!!6000000005999-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN01MGmuqb216HZ8lHn7x_!!6000000006935-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN01fAEBEq25sbosehG3j_!!6000000007582-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i4/O1CN01zCwkhV1EJdwqF1bBD_!!6000000000331-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN01jI6PGM1UoMMUAEsNe_!!6000000002564-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i2/O1CN01rcEgJX1PZB9eGdJtg_!!6000000001854-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i1/O1CN01xRwKuS1LyafPWW5sj_!!6000000001368-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN01mc4h7G1wmoGPmkBZj_!!6000000006351-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i4/O1CN01wiww4Y1cadQ1xFpBN_!!6000000003617-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i2/O1CN01EtbqaO1HZcbyJoWYK_!!6000000000772-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i4/O1CN01X2bS5y1PtKa8aFKlQ_!!6000000001898-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN01DoxoXL1tcmkKGjxcs_!!6000000005923-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i4/O1CN01fchm441RorxJKwP47_!!6000000002159-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i2/O1CN01241drV1DVGNZZjxVO_!!6000000000221-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i1/O1CN015ELpG11xOMjys8NXe_!!6000000006433-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i1/O1CN01BqHvZa1SZaLzLfn4b_!!6000000002261-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i1/O1CN01aZRWA51uMaLvxBQbC_!!6000000006023-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i3/O1CN01BBlPwt20XTSmY7Ucm_!!6000000006859-0-tps-1280-1280.jpg',
  'https://img.alicdn.com/imgextra/i1/O1CN01BJnWg81EIGlAoL3nK_!!6000000000328-0-tps-1280-1280.jpg',
];

export const Gallery = () => {
  const [leftMove, setLeftMove] = useState(0);

  const hanlderScroll = () => {
    setLeftMove(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', hanlderScroll);
    return () => {
      window.removeEventListener('scroll', hanlderScroll);
    };
  }, []);

  const galleryItems = useMemo(
    () =>
      nftImages.map((img, idx) => (
        <div
          className={styles.galleryItem}
          key={idx}
          style={{ background: `url(${img}) no-repeat center`, backgroundSize: 'contain' }}
        />
      )),
    [],
  );

  return (
    <div className={styles.container}>
      <div className={styles.galleryContainer}>
        <div className={styles.gallery} style={{ position: 'relative', left: -leftMove - 230 }}>
          {galleryItems}
        </div>
        <div className={styles.gallery} style={{ position: 'relative', left: leftMove - 2000 }}>
          {galleryItems}
        </div>
      </div>
    </div>
  );
};
