import { useEffect } from 'react';
import { Outlet, useLocation, history } from 'ice';
import { Web3Provider } from '@/components';
import { useSiwe } from '@/hooks/use-siwe';
import store from '@/store';

const routesNeedSiweSession = ['/mint'];

function CheckRoutes() {
  const { pathname } = useLocation();
  const { address, autoSignInFinished } = useSiwe();
  const [, { fetchOnchainData, fetchOnchainUserData }] = store.useModel('onchain');
  const [, { fetchTaskData, fetchLotteryWinnerList }] = store.useModel('task');

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

  return null;
}

export default () => (
  <Web3Provider>
    <CheckRoutes />
    <Outlet />
  </Web3Provider>
);
