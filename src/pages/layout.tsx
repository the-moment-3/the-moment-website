import { useEffect } from 'react';
import { Outlet, useLocation, useSearchParams, history } from 'ice';
import { isMobile } from 'react-device-detect';
import { isProd } from '@/constants';
import { Web3Provider } from '@/providers/web3';
import { useSiwe } from '@/hooks/use-siwe';
import store from '@/store';
import loadScript from 'load-script';

const routesNeedSiweSession = ['/mint'];

function CheckRoutes() {
  const { pathname } = useLocation();
  const { address, autoSignInFinished } = useSiwe();
  const [, { fetchOnchainData, fetchOnchainUserData }] = store.useModel('onchain');
  const [, { fetchTaskData, fetchLotteryWinnerList }] = store.useModel('task');
  const [searchParams] = useSearchParams();

  // 页面鉴权，未登录跳转到首页
  useEffect(() => {
    if (autoSignInFinished && !address && routesNeedSiweSession.indexOf(pathname) !== -1) {
      history?.push('/');
      window.scrollTo(0, 0);
    }
  }, [autoSignInFinished, address, pathname]);

  // 进入页面或登录成功自动获取 NFT 链上数据
  useEffect(() => {
    if (autoSignInFinished) {
      fetchOnchainData();
      // 已登录，获取用户数据
      if (address) {
        fetchOnchainUserData();
        fetchTaskData();
        fetchLotteryWinnerList();
      }
    }
  }, [autoSignInFinished, address]);

  // 在开发环境或使用参数，注入 VConsole 便于手机调试
  useEffect(() => {
    if (searchParams.get('vconsole') === '1' || (isMobile && !isProd)) {
      loadScript('https://unpkg.com/vconsole@latest/dist/vconsole.min.js', (e) => {
        if (e) {
          console.log('[vconsole] load error:', e);
        } else {
          console.log('[vconsole] load success.');
          // @ts-ignore
          new window.VConsole();
          console.log('isProd:', isProd);
          console.log('host:', window.location.host);
        }
      });
    }
  }, []);

  return null;
}

export default () => (
  <Web3Provider>
    <CheckRoutes />
    <Outlet />
  </Web3Provider>
);
