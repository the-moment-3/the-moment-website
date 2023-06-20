import { getSiweNonce, getSiweSession, siweClear, siweVerify } from '@/services/ethereum/siwe';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useDisconnect, useWalletClient, Config } from 'wagmi';
import { useEffect } from 'react';
import { isMobile, isChrome } from 'react-device-detect';
import { Modal, message } from 'antd';
import { SiweMessage } from 'siwe';
import { chainId } from '@/constants';
import store from '@/store';
import dayjs from 'dayjs';

async function generateMessage(address: string) {
  const nonce = await getSiweNonce();
  return new SiweMessage({
    domain: window.location.host,
    uri: window.location.origin,
    address,
    statement: 'Every Moment is Non-Fungible.',
    expirationTime: dayjs().add(3, 'day').toISOString(),
    version: '1',
    chainId,
    nonce,
  }).prepareMessage();
}

function getShortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
}

export function useSiwe() {
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { data: walletClient } = useWalletClient();
  const { disconnect } = useDisconnect();

  // 通过登录鉴权的地址（全局登录态）
  const [{ address, shortAddress, loading, autoSignInFinished }, { update }] = store.useModel('siwe');
  const setAddress = (address: string) => update({ address, shortAddress: getShortAddress(address) });
  const setLoading = (loading: boolean) => update({ loading });
  const setAutoSignInFinished = (autoSignInFinished: boolean) => update({ autoSignInFinished });

  // 自动登录
  const autoSignIn = async (wagmiConfig: Config) => {
    setLoading(true);
    let sessionAddress = '';
    try {
      sessionAddress = (await getSiweSession()).address;
    } catch (e) {
      console.log('[siwe] get session error:', e.message);
    }
    if (sessionAddress) {
      // 自动连接钱包
      const walletAddress = (await wagmiConfig.autoConnect())?.account;
      // 自动登录成功
      if (sessionAddress === walletAddress) {
        setAddress(sessionAddress);
      } else {
        // 如果 “连接获取的地址” 跟 “登录的地址” 跟不一样（也可能是连接失败）就立即退出
        signOut(false);
        setAutoSignInFinished(true);
      }
    } else {
      setAutoSignInFinished(true);
    }
    setLoading(false);
  };

  // 如果自动登录成功，要等待 walletClient 有值再设置 finished = true
  useEffect(() => {
    if (walletClient && !autoSignInFinished) setAutoSignInFinished(true);
  }, [walletClient]);

  const signIn = async () => {
    if (!walletClient) return;
    setLoading(true);
    const [walletAddress] = await walletClient.getAddresses();
    try {
      const message = await generateMessage(walletAddress);
      const signature = await walletClient.signMessage({ message });
      await siweVerify(message, signature);
      setAddress(walletAddress);
    } catch (e) {
      console.log('[siwe] sign in error:', e.message);
      message.error(`Sign in failed. Address: ${getShortAddress(walletAddress)}`);
      disconnect();
    }
    setLoading(false);
  };

  const signOut = (confirm = true) => {
    const onOk = async () => {
      setLoading(true);
      try {
        await siweClear();
        setAddress('');
        disconnect();
      } catch (e) {
        console.log('[siwe] sign out error:', e.message);
        message.error('Sign out failed.');
      }
      setLoading(false);
    };
    if (confirm) {
      Modal.confirm({
        title: 'Do you really want to sign out?',
        content: `Address: ${getShortAddress(address)}`,
        okType: 'danger',
        onOk,
      });
    } else {
      onOk();
    }
  };

  // Todo:
  // 暂时仅支持电脑端 Chrome 浏览器登录，后面再看下怎么兼容
  const openModal = () => {
    if (!isMobile && isChrome) {
      openConnectModal?.();
    } else {
      message.error('Please use the Chrome browser on your computer.');
    }
  };

  return {
    address,
    shortAddress,
    loading: loading || connectModalOpen,
    autoSignInFinished,
    autoSignIn,
    signIn,
    signOut,
    openModal,
  };
}
