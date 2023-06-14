import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { injectedWallet, metaMaskWallet, okxWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig, useWalletClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, goerli } from 'wagmi/chains';
import { useEffect } from 'react';
import { useSiwe } from '@/hooks/use-siwe';
import { isProd } from '@/constants';

// Wagmi 文档
// https://wagmi.sh/react/getting-started

// WalletConnect 控制台获取 projectId
// https://cloud.walletconnect.com/app/project

const projectId = 'd520d9ee9bda5c21f67275f25d777cef';

const { chains, publicClient } = configureChains(
  [isProd ? mainnet : goerli],
  [
    alchemyProvider({
      apiKey: 'XZVSdeY5vQ_7Z6SVU3oeGO3-wx1hoTaj', // 前端专用 key
    }),
    publicProvider(),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [injectedWallet({ chains }), metaMaskWallet({ projectId, chains }), okxWallet({ projectId, chains })],
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
