import { Link } from 'ice';
import dayjs from 'dayjs';
import cl from 'classnames';
import store from '@/store';
import { useI18n } from '@/hooks/use-i18n';
import { useSiwe } from '@/hooks/use-siwe';
import { NOW } from '@/constants/time';
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
  const { address, openModal } = useSiwe();
  const [{ allowListStartTime, publicStartTime }] = store.useModel('onchain');
  const [{ time }] = store.useModel('i18n');
  const translate = useI18n();

  const canPublicSale = dayjs(NOW).diff(dayjs('2023-7-7T14').valueOf()) >= 0;
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
      active: canPublicSale,
    },
  ];

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
              src="https://img.alicdn.com/imgextra/i1/O1CN011zfeRs1oY8dyV7pyk_!!6000000005236-2-tps-948-752.png"
              alt=""
            />
          </div>
          <div className={styles.timeLineContainer}>
            {timeLineSteps.map((item, idx) => {
              return <Steps label={item.label} date={item.date} price={item.price} active={item.active} key={idx} />;
            })}
          </div>
          <div className={styles.connectBtn}>
            {address ? (
              <Link to="/mint">
                <button>{translate.get('nftwebsite_zhuzao.Mintnow')}</button>
              </Link>
            ) : (
              <button onClick={openModal}>{translate.get('nft_Connectwallet')}</button>
            )}
          </div>
        </div>
        <div className={styles.rightSide}>
          <img
            src="https://img.alicdn.com/imgextra/i1/O1CN011zfeRs1oY8dyV7pyk_!!6000000005236-2-tps-948-752.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
