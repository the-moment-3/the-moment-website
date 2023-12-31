import cl from 'classnames';
import NP from 'number-precision';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { StepStatus } from '@/constants/freeMintSteps';
import { useI18n } from '@/hooks/use-i18n';
import { useMint } from '@/hooks/use-mint';
import { ReplaceMDSText } from '@/components';
import store from '@/store';
import { NOW } from '@/constants/time';
import { LANGUAGES } from '@/constants/i18n';

import styles from './styles.module.css';

export const FreeMintAndPublicSale = ({ status }: { status: StepStatus }) => {
  const [
    {
      totalMintedAmount,
      collectionSize,
      addressMintedAmount,
      contractAddress,
      perAddressMaxMintAmount,
      allowListRemainAmount,
      allowListTotalAmount,
      allowListMerkleProof,
      publicDisplayPrice,
      allowListStartTime,
    },
  ] = store.useModel('onchain');
  const translate = useI18n();
  const [i18n] = store.useModel('i18n');

  const [count, setCount] = useState(allowListRemainAmount);
  useEffect(() => {
    setCount(status === StepStatus.WIN ? allowListRemainAmount : 1);
  }, [allowListRemainAmount]);

  const canMint = dayjs(NOW).diff(allowListStartTime) >= 0;

  const subtotal = NP.times(publicDisplayPrice, count);
  const discount = NP.times(publicDisplayPrice, count);
  const total = NP.minus(subtotal, discount);

  const totalRemainAmount = NP.minus(collectionSize, totalMintedAmount);

  const handleMinus = () => {
    if (count === allowListRemainAmount) return;
    setCount(count - 1);
  };

  const handleAdd = () => {
    if (count === perAddressMaxMintAmount) return;
    setCount(count + 1);
  };

  const { mint } = useMint({
    contractAddress,
    args: {
      amount: count,
      allowListTotalAmount,
      allowListMerkleProof,
    },
    value: total,
    channelCode: '',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.title}>{translate.get('nftwebsite_Congratulate.mint')}</div>
          <div className={styles.counterContainer}>
            <div className={styles.counter}>
              <button
                className={cl({
                  [styles.minusBtn]: true,
                  [styles.disabled]: true,
                })}
                disabled={true}
                onClick={handleMinus}
              >
                <div className={styles.minus}></div>
              </button>
              <div className={styles.count}>{count}</div>
              <button
                className={cl({
                  [styles.addBtn]: true,
                  [styles.disabled]: true,
                })}
                disabled={true}
                onClick={handleAdd}
              >
                <div className={styles.adds}>
                  <div className={styles.add}></div>
                  <div className={styles.add}></div>
                </div>
              </button>
            </div>
            {status === StepStatus.WIN && (
              <div className={styles.counterDesc}>
                <ReplaceMDSText
                  text={translate.get('nftwebsite_Congratulate.5NFTs')}
                  ReplacedTag={'span'}
                  replaceClassName={styles.discountTips}
                  replaceText={{
                    0: i18n.lang === LANGUAGES.EN ? `${allowListTotalAmount} NFT(s)` : `NFT ${allowListTotalAmount}`,
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.priceDesc}>
              <div className={styles.nftDesc}>{translate.get('nftwebsite_Congratulate.Unitprice')}</div>
              <div className={styles.subtotalDesc}>{translate.get('nftwebsite_Congratulate.Total')}</div>
              <div className={styles.discountsDesc}>{translate.get('nftwebsite_Congratulate.Discount')}</div>
              <div className={styles.totalDesc}>{translate.get('nftwebsite_Congratulate.Amountdue')}</div>
            </div>
            <div className={styles.price}>
              <div className={styles.nftPrice}>{`${publicDisplayPrice}ETH`}</div>
              <div className={styles.subtotal}>{`${subtotal}ETH`}</div>
              <div className={styles.discounts}>{`-${discount}ETH`}</div>
              <div className={styles.total}>{`${total}ETH`}</div>
            </div>
          </div>
          {canMint && (
            <div className={styles.mintButton}>
              <button onClick={mint}>
                {status === StepStatus.WIN
                  ? translate.get('nftwebsite_zhuzao.Freemint')
                  : translate.get('nftwebsite_Congratulate.Mintnow')}
              </button>
            </div>
          )}
          <div className={styles.mobileNftRemainer}>
            {translate.get('nftwebsite_Congratulate.Remaining1', '', {
              0: collectionSize - totalMintedAmount,
              1: collectionSize,
            })}
          </div>
        </div>
        <div
          className={cl({
            [styles.rightSide]: status === StepStatus.FREE_MINT_FOR_ALL,
            [styles.rightSideLarger]: status === StepStatus.WIN,
          })}
        >
          <div
            className={cl({
              [styles.nftBox]: status === StepStatus.FREE_MINT_FOR_ALL,
              [styles.nftBoxLarger]: status === StepStatus.WIN,
            })}
          />
          <div className={styles.nftRemainer}>
            {translate.get('nftwebsite_Congratulate.Remaining1', '', {
              0: collectionSize - totalMintedAmount,
              1: collectionSize,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
