import { Link } from 'ice';
import dayjs from 'dayjs';
import cl from 'classnames';
import { message } from 'antd';
import store from '@/store';
import { useI18n } from '@/hooks/use-i18n';
import { useWallet } from '@/hooks/use-wallet';
import { NOW } from '@/constants/time';
import styles from './styles.module.css';
import { sumEvent } from '@/utils/arms';

const Steps = ({ label, date, price, active }: { label?: string; date?: string; price?: string; active: boolean }) => {
  return (
    <div className={styles.timeLineSide}>
      <div
        className={cl({
          [styles.timeLineLabel]: true,
          [styles.timeLineLabelActive]: active,
        })}
      >
        {label}
      </div>
      <div className={styles.timeLine}>
        <div
          className={cl({
            [styles.line]: true,
            [styles.lineActive]: active,
            [styles.lineInActive]: !active,
          })}
        ></div>
        <div
          className={cl({
            [styles.dot]: true,
            [styles.dotActive]: active,
            [styles.dotInActive]: !active,
          })}
        />
        <div
          className={cl({
            [styles.line]: true,
            [styles.lineActive]: active,
            [styles.lineInActive]: !active,
          })}
        ></div>
      </div>
      <div
        className={cl({
          [styles.timeLineInfo]: true,
          [styles.timeLineInfoActive]: active,
        })}
      >
        <div>{date}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};

export const Homepage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { address, connect } = useWallet();
  const [{ taskStartTime, allowListEndTime }] = store.useModel('onchain');
  const translate = useI18n();

  const hasTaskStart = dayjs(NOW).diff(taskStartTime) >= 0;

  const hasFreeMintEnd = dayjs(NOW).diff(allowListEndTime) >= 0;

  const timeLineSteps = [
    {
      label: translate.get('nftwebsite_zhu_freemint'),
      date: translate.get('nftwebsite_homepage_freemint_start_time'),
      price: translate.get('nftwebsite_zhuzao.free'),
      active: true,
    },
    {
      label: translate.get('nftwebsite_zhu_freeend'),
      date: translate.get('nftwebsite_homepage_freemint_end_time'),
      price: translate.get('nftwebsite_zhuzao.free'),
      active: hasFreeMintEnd,
    },
  ];

  const openInfo = () => {
    sumEvent('PC_MintBeforeTaskStart_Homepage');
    messageApi.open({
      className: styles.message,
      type: 'info',
      content: translate.get('nftwebsite_Comingsoon'),
      icon: <></>,
      duration: 3,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80px',
      },
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.blooming}></div>
        <div className={styles.leftSide}>
          <div className={styles.info}>
            <div className={styles.infoTitle}>
              <div>{translate.get('nftwebsite_zhubiaoti.DiscoverTheMoment3NFTcollection')}</div>
            </div>
            <div className={styles.infoText}>
              <div>{translate.get('nftwebsite_fubiaoti.5555unique')}</div>
            </div>
          </div>
          <div className={styles.page}>
            <img
              src="https://img.alicdn.com/imgextra/i1/O1CN01UoeTdQ1pTqYVN8HLh_!!6000000005362-2-tps-708-501.png"
              alt="The Moment3!"
            />
          </div>
          <div className={styles.timeLineContainer}>
            {timeLineSteps.map((item, idx) => {
              return <Steps label={item.label} date={item.date} price={item.price} active={item.active} key={idx} />;
            })}
          </div>
          {contextHolder}
          <div className={styles.connectBtn}>
            {address ? (
              hasTaskStart ? (
                <Link to="/mint">
                  <button onClick={() => sumEvent('PC_MintAfterTaskStart_Homepage')}>
                    {translate.get('nftwebsite_zhuzao.Mintnow')}
                  </button>
                </Link>
              ) : (
                <button onClick={openInfo}>{translate.get('nftwebsite_zhuzao.Mintnow')}</button>
              )
            ) : (
              <button
                onClick={() => {
                  sumEvent('PC_ConeectWallet_Homepage');
                  connect();
                }}
              >
                {translate.get('nft_Connectwallet')}
              </button>
            )}
            <a href="https://www.bybit.com/en-US/nft/detail/?id=2096644&source=aliexpress" target="_blank">
              <div
                className={styles.thirdpartyExchange}
                onClick={() => {
                  sumEvent('PC_ByBit_Homepage');
                }}
              ></div>
            </a>
          </div>
        </div>
        <div className={styles.rightSide}>
          <img
            src="https://img.alicdn.com/imgextra/i1/O1CN01UoeTdQ1pTqYVN8HLh_!!6000000005362-2-tps-708-501.png"
            alt="The Moment3!"
          />
        </div>
      </div>
    </div>
  );
};
