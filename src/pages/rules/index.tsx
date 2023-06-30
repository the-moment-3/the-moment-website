import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { navAnchor } from '@/utils/nav';
import { useI18n } from '@/hooks/use-i18n';
import store from '@/store';
import classNames from 'classnames';
import styles from './index.module.css';

export default () => {
  const translate = useI18n();
  const [{ collectionSize }] = store.useModel('onchain');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tasksList = [
    {
      title: translate.get('nftwebsite_tase1'),
      img: 'https://img.alicdn.com/imgextra/i1/O1CN01kVssNe24tEkTBwv5W_!!6000000007448-2-tps-383-82.png',
    },
    {
      title: translate.get('nftwebsite_tase2'),
      img: 'https://img.alicdn.com/imgextra/i3/O1CN01EIiHTl1VGIWV6i6Ow_!!6000000002625-2-tps-383-82.png',
    },
    {
      title: translate.get('nftwebsite_tase3'),
      img: 'https://img.alicdn.com/imgextra/i1/O1CN01Z40lEO1vOhny2paNB_!!6000000006163-2-tps-382-196.png',
    },
  ];
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.title}>{translate.get('nftwebsite_rules.minting')}</div>
            <div className={styles.desc}>
              {translate.get('nftwebsite_rules.total5555')}{' '}
              <span className={styles.collectSize}>{collectionSize.toLocaleString()}</span>
            </div>
            <div className={styles.subtitle}>{translate.get('nftwebsite_rules.mintingschedule')}</div>
            <div className={styles.desc}>
              {translate.get('nftwebsite_rules.allowlist')}{' '}
              <span className={styles.descBold}>{translate.get('nftwebsite_homepage_freemint_start_time')}</span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{translate.get('nftwebsite_rules.howtoqualify')}</div>
            <div className={styles.desc}>{translate.get('nftwebsite_rules.taskperiod')}</div>
            <div className={styles.desc}>{translate.get('nftwebsite_rules.complete3tasks')}</div>
            <div className={styles.taskWrapper}>
              <div className={styles.taskDesc}>{translate.get('nftwebsite_rules.task.1')}</div>
              <div
                className={styles.taskImg}
                style={{
                  background: `url(https://img.alicdn.com/imgextra/i2/O1CN01j8Li0Q1U2GmBpFQl5_!!6000000002459-2-tps-383-82.png) no-repeat center center`,
                  backgroundSize: 'contain',
                }}
              ></div>
            </div>
            <div className={styles.taskWrapper}>
              <div className={styles.taskDesc}>{translate.get('nftwebsite_rules.task.2')}</div>
              <div
                className={styles.taskImg}
                style={{
                  background: `url(https://img.alicdn.com/imgextra/i3/O1CN01Zjt8A21oMEM46TTkO_!!6000000005210-2-tps-383-82.png) no-repeat center center`,
                  backgroundSize: 'contain',
                }}
              ></div>
            </div>
            <div className={styles.taskWrapper}>
              <div className={styles.taskDesc}>{translate.get('nftwebsite_rules.task.3')}</div>
              <div
                className={styles.taskImgLarger}
                style={{
                  background: `url(https://img.alicdn.com/imgextra/i2/O1CN01XlihSm1c3eu9ZdQk5_!!6000000003545-2-tps-382-196.png) no-repeat center center`,
                  backgroundSize: 'contain',
                }}
              ></div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{translate.get('nftwebsite_rules.allowlist.rules')}</div>
            <div className={styles.desc}>{translate.get('nftwebsite_rules.allowlist.rules1')}</div>
            <div className={styles.desc}>{translate.get('nftwebsite_rules.allowlist.rules2')}</div>
          </div>
          <div className={styles.endclause}>{translate.get('endclause')}</div>
          <div className={styles.footer}>
            <img
              src="https://img.alicdn.com/imgextra/i4/O1CN01VVxB1620tSTMdL7Pz_!!6000000006907-2-tps-560-55.png"
              alt="cooperation"
            />
          </div>
        </div>

        <div className={styles.app}>
          <img
            src="https://img.alicdn.com/imgextra/i1/O1CN01gJ751z1ht1Oe7HPtx_!!6000000004334-2-tps-1125-1365.png"
            className={styles.bg}
          />
          <div className={styles.content}>
            <div className={styles.title}>{translate.get('nftwebsite_rules.minting')}</div>
            <div className={styles.subTitleWrap}>
              <span className={styles.commonText}>{translate.get('nftwebsite_rules.total5555')}</span>
              <span className={styles.totalNum}>5,555</span>
            </div>

            <div className={styles.title}>{translate.get('nftwebsite_rules.mintingschedule')}</div>
            <div className={styles.subTitleWrap}>
              <span className={styles.commonText}>{translate.get('nftwebsite_rules.allowlist')} </span>
              <span className={styles.subTitleVal}> {translate.get('nftwebsite_homepage_freemint_start_time')} </span>
            </div>

            <div className={styles.title}>{translate.get('nftwebsite_rules.howtoqualify')}</div>
            <div className={classNames(styles.commonText, styles.marginTop24)}>
              {translate.get('nftwebsite_rules.taskperiod')}
            </div>
            <div className={classNames(styles.commonText, styles.marginTop24)}>
              {translate.get('nftwebsite_rules.complete3tasks')}
            </div>

            {tasksList.map((item, index) => {
              return (
                <div className={styles.taskWrap} key={index}>
                  <div className={styles.commonText}>{item.title}</div>
                  <img className={styles.taskImg} src={item.img} />
                </div>
              );
            })}

            <div className={styles.title}>{translate.get('nftwebsite_rules.allowlist.rules')}</div>
            <div className={classNames(styles.commonText, styles.marginTop24)}>
              {translate.get('nftwebsite_rules.allowlist.rules1')}
            </div>
            <div className={classNames(styles.commonText, styles.marginTop24)}>
              {translate.get('nftwebsite_rules.allowlist.rules2')}
            </div>

            <div className={styles.endclause}>{translate.get('endclause')}</div>
            <img
              src="https://img.alicdn.com/imgextra/i4/O1CN01ptze7h22N3gZhHKmn_!!6000000007107-2-tps-560-55.png"
              className={styles.logo}
            />
          </div>
        </div>
      </div>
    </>
  );
};
