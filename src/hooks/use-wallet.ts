import { useEffect, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Modal } from 'antd';
import store from '@/store';

function getShortAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
}

export function useWallet() {
  // 连接钱包相关
  const { address: wagmiAddress, isConnected, isDisconnected, isConnecting } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  // 全局登录状态
  const [{ address, shortAddress, autoConnectFinished }, { update }] = store.useModel('wallet');
  const setAddress = (address: string) => update({ address, shortAddress: getShortAddress(address) });
  const setAutoConnectFinished = (autoConnectFinished: boolean) => update({ autoConnectFinished });

  useEffect(() => {
    if (wagmiAddress) {
      setAddress(wagmiAddress);
    } else {
      setAddress('');
    }
  }, [wagmiAddress]);

  useEffect(() => {
    if (isConnected || isDisconnected) {
      setAutoConnectFinished(true);
    }
  }, [isConnected, isDisconnected]);

  const connect = () => {
    openConnectModal?.();
  };

  const disconnect = useCallback(() => {
    Modal.confirm({
      title: 'Do you really want to sign out?',
      content: `Address: ${shortAddress}`,
      okType: 'danger',
      onOk: () => {
        wagmiDisconnect();
      },
    });
  }, [shortAddress]);

  return {
    address,
    shortAddress,
    loading: connectModalOpen || isConnecting,
    autoConnectFinished,
    connect,
    disconnect,
  };
}
