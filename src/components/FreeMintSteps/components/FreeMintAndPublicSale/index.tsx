import { StepStatus } from '@/constants/freeMintSteps';
import cl from 'classnames';
import NP from 'number-precision';
import { useEffect, useState } from 'react';
import { useI18n } from '@/hooks/use-i18n';
import { useMint } from '@/hooks/use-mint';
import { ReplaceMDSText } from '@/components';
import store from '@/store';
import styles from './styles.module.css';

export const FreeMintAndPublicSale = ({ status }: { status: StepStatus }) => {
  const [
    {
      addressMintedAmount,
      contractAddress,
      perAddressMaxMintAmount,
      allowListRemainAmount,
      allowListTotalAmount,
      allowListMerkleProof,
      publicPrice,
    },
  ] = store.useModel('onchain');
  const translate = useI18n();

  const [count, setCount] = useState(allowListRemainAmount);
  useEffect(() => {
    setCount(allowListRemainAmount);
  }, [allowListRemainAmount]);

  const subtotal = NP.times(publicPrice, count);
  const discount = NP.times(publicPrice, allowListRemainAmount);

  const total = status === StepStatus.WIN ? NP.minus(subtotal, discount) : subtotal;

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
                  [styles.disabled]: count === allowListRemainAmount,
                })}
                onClick={handleMinus}
              >
                <div className={styles.minus}></div>
              </button>
              <div className={styles.count}>{count}</div>
              <button
                className={cl({
                  [styles.addBtn]: true,
                  [styles.disabled]: count === perAddressMaxMintAmount,
                })}
                onClick={handleAdd}
              >
                <div className={styles.adds}>
                  <div className={styles.add}></div>
                  <div className={styles.add}></div>
                </div>
              </button>
            </div>
            <div className={styles.counterDesc}>
              {/* {count !== perAddressMaxMintAmount ? (
                <ReplaceMDSText
                  text={'Early qualifiers can mint up to {0}. You can mint up to {1} for free.'} // mds
                  ReplacedTag={'span'}
                  replaceClassName={styles.discountTips}
                  replaceText={{ 0: '5 NFTs', 1: `${allowListRemainAmount} NFT(s)` }}
                />
              ) : status === StepStatus.PUBLIC_SALE ? (
                <div>{translate.get('nft_minted')}</div> //mds
              ) : (
                <div>
                  Limit: <span className={styles.discountTips}>{perAddressMaxMintAmount} NFTs</span> per person.
                </div>
              )} */}
              {status === StepStatus.PUBLIC_SALE ? (
                <ReplaceMDSText
                  text={translate.get('nft_minted')} // mds
                  ReplacedTag={'span'}
                  replaceClassName={styles.discountTips}
                  replaceText={{
                    0: `${addressMintedAmount} NFTs`,
                    1: `${perAddressMaxMintAmount - addressMintedAmount} NFT(s)`,
                  }}
                />
              ) : (
                <ReplaceMDSText
                  text={'Early qualifiers can mint up to {0}. You can mint up to {1} for free.'} // mds
                  ReplacedTag={'span'}
                  replaceClassName={styles.discountTips}
                  replaceText={{ 0: '5 NFTs', 1: `${allowListRemainAmount} NFT(s)` }}
                />
              )}
            </div>
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.priceDesc}>
              <div className={styles.nftDesc}>{translate.get('nftwebsite_Congratulate.Unitprice')}</div>
              {status === StepStatus.WIN && (
                <div className={styles.subtotalDesc}>{translate.get('nftwebsite_Congratulate.Total')}</div>
              )}
              {status === StepStatus.WIN && (
                <div className={styles.discountsDesc}>{translate.get('nftwebsite_Congratulate.Discount')}</div>
              )}
              <div className={styles.totalDesc}>{translate.get('nftwebsite_Congratulate.Amountdue')}</div>
            </div>
            <div className={styles.price}>
              <div className={styles.nftPrice}>{`${publicPrice}ETH`}</div>
              {status === StepStatus.WIN && <div className={styles.subtotal}>{`${subtotal}ETH`}</div>}
              {status === StepStatus.WIN && (
                <div className={styles.discounts}>{`-${discount}ETH(${allowListRemainAmount}Free Mint)`}</div>
              )}
              <div className={styles.total}>{`${total}ETH`}</div>
            </div>
          </div>
          <div className={styles.mintButton}>
            <button onClick={mint}>
              {status === StepStatus.WIN ? `Free Mint` : translate.get('nftwebsite_Congratulate.Mintnow')}
            </button>
          </div>
          <div className={styles.mobileNftRemainer}>Remaining: 500/2000</div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.nftBox} />
          <div className={styles.nftRemainer}>Remaining: 500/2000</div>
        </div>
      </div>
    </div>
  );
};
