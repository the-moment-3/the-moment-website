import { useState, useEffect, useMemo } from 'react';
import { Button, Modal } from 'antd';
import { useI18n } from '@/hooks/use-i18n';
import { GetLotteryWinnerListResponse } from '@/services/korea-nft/lottery-winner-list';
import styles from './styles.module.css';
interface WinnerListBtnProp {
  winnerList: GetLotteryWinnerListResponse;
  cln: string;
}

export const WinnerListBtn = ({ winnerList, cln }: WinnerListBtnProp) => {
  const [visible, setVisible] = useState(false);
  const [showAddress, setShowAddress] = useState(true);
  const translate = useI18n();

  const formattedWinnerList = useMemo(() => {
    return winnerList.map((winner) => {
      return {
        ...winner,
        formatEthereumAddress: `${winner.ethereumAddress.slice(0, 4)}...${winner.ethereumAddress.slice(-3)}`,
      };
    });
  }, winnerList);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = () => {
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
            {formattedWinnerList.map((winner, idx) => {
              return (
                <div className={styles.winner} key={idx}>
                  <span className={styles.luckyNumber}>#{winner.lotteryNumber}</span>
                  {showAddress && <span className={styles.address}>{winner.formatEthereumAddress}</span>}
                </div>
              );
            })}
          </div>
          <Button className={styles.closeBtn} onClick={handleCancel}>
            {translate.get('nftwebsite_number.close')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
