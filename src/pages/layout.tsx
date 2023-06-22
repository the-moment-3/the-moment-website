import { useEffect } from 'react';
import { Outlet, useLocation, useSearchParams, history } from 'ice';
import { isMobile } from 'react-device-detect';
import { isProd } from '@/constants';
import { Web3Provider } from '@/providers/web3';
import { useSiwe } from '@/hooks/use-siwe';
import { initVConsole } from '@/utils/vconsole';
import store from '@/store';

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

  // 在开发环境或使用参数注入 VConsole（便于手机调试）
  useEffect(() => {
    if ((isMobile && !isProd) || searchParams.get('vconsole')) {
      initVConsole();
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
