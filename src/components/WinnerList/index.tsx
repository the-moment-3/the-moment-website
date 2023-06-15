import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useI18n } from '@/hooks/use-i18n';

const _winnerList = new Array(2000).fill(0).map((item, idx) => {
  return { luckyNumber: idx, address: '0x****123' };
});

export interface WinnerList {
  luckyNumber: number;
  address: string;
}

interface WinnerListBtnProp {
  winnerList: WinnerList[];
  cln: string;
}

export const WinnerListBtn = ({ winnerList, cln }: WinnerListBtnProp) => {
  const [visible, setVisible] = useState(false);
  const [showAddress, setShowAddress] = useState(true);
  const [height, setHeight] = useState('');
  const translate = useI18n();

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleCancel = () => {
    const bd = document.querySelector('#ice-container')! as HTMLElement;
    bd.style.height = height;
    bd.style.overflow = 'auto';
    setVisible(false);
  };

  const handleClick = () => {
    const bd = document.querySelector('#ice-container')! as HTMLElement;
    setHeight(bd.style.height);
    bd.style.height = '100vh';
    bd.style.overflow = 'hidden';
    setVisible(true);
  };

  const handleWindowResize = () => {
    setShowAddress(window.innerWidth >= 768);
  };

  return (
    <div className={styles.wrapper}>
      <Button className={cln} onClick={handleClick} ghost>
        {translate.get('nftwebsite_lost.Winnerslist')}
      </Button>
      <Modal
        wrapClassName={styles.modalWrapper}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        centered
      >
        <div className={styles.listWrapper}>
          <div className={styles.box}></div>
          <div className={styles.title}> {translate.get('nftwebsite_lost.Winnerslist')} </div>
          <div className={styles.list}>
            {_winnerList.map((winner, idx) => {
              return (
                <div className={styles.winner} key={idx}>
                  <span className={styles.luckyNumber}>#{winner.luckyNumber}</span>
                  {showAddress && <span className={styles.address}>{winner.address}</span>}
                </div>
              );
            })}
          </div>
          <Button className={styles.closeBtn} onClick={handleCancel}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};
