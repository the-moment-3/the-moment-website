import { useEffect } from 'react';
import { Outlet, useLocation, history } from 'ice';
import { Web3Provider } from '@/providers/web3';
import { useWallet } from '@/hooks/use-wallet';
import { useVConsole } from '@/hooks/use-vconsole';
import store from '@/store';

const routesShouldConnected = ['/mint'];

function CheckRoutes() {
  const { pathname } = useLocation();
  const { address, autoConnectFinished } = useWallet();
  const [, { fetchOnchainData, fetchOnchainUserData }] = store.useModel('onchain');
  const [, { fetchTaskData, fetchLotteryWinnerList }] = store.useModel('task');

  // 如果未连接钱包，重定向到首页
  useEffect(() => {
    if (autoConnectFinished && !address && routesShouldConnected.indexOf(pathname) !== -1) {
      history?.push('/');
      window.scrollTo(0, 0);
    }
  }, [autoConnectFinished, address, pathname]);

  // 进入页面，或连接钱包成功，自动获取数据
  useEffect(() => {
    if (autoConnectFinished) {
      // 获取 NFT 数据
      fetchOnchainData();
      // 已连接钱包，获取用户数据
      if (address) {
        fetchOnchainUserData();
        fetchTaskData();
        // fetchLotteryWinnerList();
      }
    }
  }, [autoConnectFinished, address]);

  useVConsole();

  return null;
}

export default () => (
  <Web3Provider>
    <CheckRoutes />
    <Outlet />
  </Web3Provider>
);
