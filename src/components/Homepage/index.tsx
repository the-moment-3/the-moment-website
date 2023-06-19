import { Link } from 'ice';
import dayjs from 'dayjs';
import cl from 'classnames';
import { message } from 'antd';
import store from '@/store';
import { useI18n } from '@/hooks/use-i18n';
import { useSiwe } from '@/hooks/use-siwe';
import { NOW, TASK_START_TIME, FREE_MINT_START_TIME, FREE_MINT_END_TIME } from '@/constants/time';
import styles from './styles.module.css';

const Steps = ({ label, date, price, active }: { label?: string; date: string; price?: string; active: boolean }) => {
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

export const Homepage = ({ pageIdx }: { pageIdx?: string }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { address, openModal } = useSiwe();
  const [{ taskStartTime, allowListStartTime, allowListEndTime, publicStartTime }] = store.useModel('onchain');
  const [{ time }] = store.useModel('i18n');
  const translate = useI18n();

  const hasTaskStart = dayjs(NOW).diff(TASK_START_TIME) >= 0;
  const hasFreeMintStart = dayjs(NOW).diff(FREE_MINT_START_TIME) >= 0;
  const hasFreeMintEnd = dayjs(NOW).diff(FREE_MINT_END_TIME) >= 0;

  const timeLineSteps = [
    {
      label: translate.get('nftwebsite_zhuzao.Freemint'),
      date: `${dayjs(allowListStartTime).tz(time.timezone).format('MMM D, YYYY HH:mm')} (${time.timezoneAbbr})`,
      price: translate.get('nftwebsite_zhuzao.free'),
      active: true,
    },
    {
      label: translate.get('nftwebsite_zhuzao.Publicmint'),
      date: `${dayjs(publicStartTime).tz(time.timezone).format('MMM D, YYYY HH:mm')} (${time.timezoneAbbr})`,
      price: translate.get('nftwebsite_zhuzao.0088'),
      active: hasFreeMintEnd,
    },
  ];

  const openInfo = () => {
    messageApi.open({
      className: styles.message,
      type: 'info',
      content: 'hello',
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
    <div className={styles.pageWrapper} id={pageIdx}>
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
              src="https://img.alicdn.com/imgextra/i1/O1CN0192DGr2297DIXhziLX_!!6000000008020-2-tps-1062-752.png"
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
              <Link to="/mint">
                <button>{translate.get('nftwebsite_zhuzao.Mintnow')}</button>
              </Link>
            ) : (
              <button onClick={hasTaskStart ? openModal : openInfo}>{translate.get('nft_Connectwallet')}</button>
            )}
          </div>
        </div>
        <div className={styles.rightSide}>
          <img
            src="https://img.alicdn.com/imgextra/i1/O1CN0192DGr2297DIXhziLX_!!6000000008020-2-tps-1062-752.png"
            alt="The Moment3!"
          />
        </div>
      </div>
    </div>
  );
};
