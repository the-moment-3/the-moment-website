import { Link } from 'ice';
import { Drawer, Button } from 'antd';
import { useEffect, useState } from 'react';
import { mediaList } from '@/constants/media';
import { LANGUAGES, TIMEZONE, TIMEZONE_ABBR } from '@/constants/i18n';
import { useI18n } from '@/hooks/use-i18n';
import { useWallet } from '@/hooks/use-wallet';
import { MediaIcon } from '../MediaIcon';
import { navAnchor, scrollByLink } from '@/utils/nav';
import { sumEvent } from '@/utils/arms';
import store from '@/store';
import cl from 'classnames';
import styles from './styles.module.css';

export const Header = () => {
  const { shortAddress, loading, connect, disconnect } = useWallet();
  const [drawerActive, setDrawerActive] = useState(false);
  const [opacity, setOpacity] = useState(0.6);
  const [i18n, i18nDispatcher] = store.useModel('i18n');
  const translate = useI18n();

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [drawerActive]);

  const handleWindowResize = () => {
    if (window.innerWidth > 768) setDrawerActive(false);
  };

  const handleScroll = () => {
    if (drawerActive) {
      setOpacity(1);
      return;
    }
    let currentOffsetTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentOffsetTop !== 0) {
      setOpacity(currentOffsetTop / 100 > 1 ? 1 : currentOffsetTop / 100 + 0.6);
    } else {
      setOpacity(0.6);
    }
  };

  const handleLangUpdate = () => {
    sumEvent('PC_Translate_Header');
    i18nDispatcher.update({
      lang: i18n.lang === LANGUAGES.EN ? LANGUAGES.KO : LANGUAGES.EN,
      time:
        i18n.time.timezone === TIMEZONE.EST
          ? { timezone: TIMEZONE.KST, timezoneAbbr: TIMEZONE_ABBR.KST }
          : { timezone: TIMEZONE.EST, timezoneAbbr: TIMEZONE_ABBR.EST },
    });
  };

  const DropdownBtn = () => {
    const handleClick = () => {
      let currentOffsetTop = document.documentElement.scrollTop || document.body.scrollTop;
      const deferSetOpacity = (op: number, delay: number) => {
        setTimeout(() => {
          setOpacity(op);
        }, delay);
      };
      if (!currentOffsetTop) {
        !drawerActive ? setOpacity(1) : deferSetOpacity(0.6, 350);
      }
      setDrawerActive(!drawerActive);
    };
    return (
      <button
        className={cl({
          [styles.dropdownBtn]: true,
          [styles.active]: drawerActive,
        })}
        onClick={handleClick}
      >
        <span />
        <span />
        <span />
      </button>
    );
  };

  return (
    <div className={styles.headerWrapper} style={{ backgroundColor: `rgba(28,28,27, ${opacity})` }}>
      <div className={styles.container}>
        <div className={styles.left}>
          <DropdownBtn />
          <Drawer
            placement={'top'}
            closable
            open={drawerActive}
            onClose={() => {
              setDrawerActive(false);
            }}
            headerStyle={{ display: 'none' }}
            height={'auto'}
            rootStyle={{
              zIndex: 15,
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            <div style={{ height: '80px' }} />
            {navAnchor.map((item) => (
              <Link className={styles.drawerNavItemWrapper} to={item.link} key={item.link}>
                <div
                  className={styles.drawerNavItem}
                  onClick={() => {
                    sumEvent(`PC_${translate.get(item.title)}_Drawer`);
                    scrollByLink(item.link);
                  }}
                >
                  {translate.get(item.title)}
                </div>
              </Link>
            ))}
          </Drawer>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className={styles.logoContainer}>
            <div className={styles.logo} />
          </Link>
        </div>
        <div className={styles.nav}>
          {navAnchor.map((item) => (
            <div
              className={styles.navItem}
              key={item.link}
              onClick={() => {
                sumEvent(`PC_${translate.get(item.title)}_Header`);
                scrollByLink(item.link);
              }}
            >
              <Link to={item.link}>{translate.get(item.title)}</Link>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          <MediaIcon mediaList={mediaList} size={48} cln={styles.media} pos={'Header'} />
          <div className={styles.translate} onClick={handleLangUpdate} />
          <Button
            className={styles.wallet}
            loading={loading}
            disabled={loading}
            onClick={() => {
              if (shortAddress) {
                sumEvent('PC_DisconnectWallet_Header');
                disconnect();
              } else {
                sumEvent('PC_ConnectWallet_Header');
                connect();
              }
            }}
          >
            <div className={styles.btnIcon} />
            {shortAddress || translate.get('nft_Connectwallet')}
          </Button>
        </div>
      </div>
    </div>
  );
};
