import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig, useWalletClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useEffect } from 'react';
import { chain, alchemyApiKey, walletConnectProjectId as projectId } from '@/constants';
import { useSiwe } from '@/hooks/use-siwe';

// Wagmi 文档
// https://wagmi.sh/react/getting-started

const { chains, publicClient } = configureChains(
  [chain],
  [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [walletConnectWallet({ projectId, chains })],
  },
]);

const wagmiConfig = createConfig({ publicClient, connectors });

const SiweSession = () => {
  const { autoSignInFinished, autoSignIn, signIn } = useSiwe();
  const { data: walletClient } = useWalletClient();

  // 进入页面自动登录
  useEffect(() => {
    autoSignIn(wagmiConfig);
  }, []);

  // 监听手动连接钱包或切换钱包，执行登录
  useEffect(() => {
    if (walletClient && autoSignInFinished) signIn();
  }, [walletClient]);

  return null;
};

export const Web3Provider = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} modalSize="compact">
      <SiweSession />
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
