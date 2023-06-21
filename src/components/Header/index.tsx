import { Drawer, Button } from 'antd';
import { useEffect, useState } from 'react';
import cl from 'classnames';
import { mediaList } from '@/constants/media';
import { LANGUAGES, TIMEZONE, TIMEZONE_ABBR } from '@/constants/i18n';
import { useI18n } from '@/hooks/use-i18n';
import { useSiwe } from '@/hooks/use-siwe';
import { MediaIcon } from '../MediaIcon';
import { NavAnchor } from '@/constants/home';
import store from '@/store';
import { sendEvent } from '@/utils/aemTracker';
import styles from './styles.module.css';

export const Header = ({ navAnchor }: { navAnchor: NavAnchor[] }) => {
  const [drawerActive, setDrawerActive] = useState(false);
  const [opacity, setOpacity] = useState(0.6);
  const { shortAddress, loading, openModal, signOut } = useSiwe();
  const [i18n, i18nDispatcher] = store.useModel('i18n');
  const translate = useI18n();

  navAnchor = navAnchor.filter((item) => {
    return item.title !== 'Homepage';
  });
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
    sendEvent('PC_Translate_Header');
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

  const connectWallet = () => {
    sendEvent('PC_ConnectWallet_Header');
    openModal();
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
            {navAnchor.map((item) => {
              return (
                <a className={styles.drawerNavItemWrapper} href={item.href} key={item.key}>
                  <div
                    className={styles.drawerNavItem}
                    onClick={() => sendEvent(`PC_${translate.get(item.title)}_Drawer`)}
                  >
                    {translate.get(item.title)}
                  </div>
                </a>
              );
            })}
          </Drawer>
          <a href="#/homepage" className={styles.logoContainer}>
            <div className={styles.logo}></div>
          </a>
        </div>
        <div className={styles.nav}>
          {navAnchor.map((item) => {
            return (
              <div
                className={styles.navItem}
                key={item.key}
                onClick={() => sendEvent(`PC_${translate.get(item.title)}_Header`)}
              >
                <a href={item.href}>{translate.get(item.title)}</a>
              </div>
            );
          })}
        </div>
        <div className={styles.right}>
          <MediaIcon mediaList={mediaList} size={48} cln={styles.media} pos={'Header'} />
          <div className={styles.translate} onClick={handleLangUpdate}></div>
          <Button
            className={styles.wallet}
            loading={loading}
            disabled={loading}
            onClick={() => {
              shortAddress ? signOut() : connectWallet();
            }}
          >
            <div className={styles.btnIcon}></div>
            {shortAddress || translate.get('nft_Connectwallet')}
          </Button>
        </div>
      </div>
    </div>
  );
};
