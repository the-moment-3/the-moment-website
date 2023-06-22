import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { chain, alchemyApiKey, walletConnectProjectId as projectId } from '@/constants';

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

const wagmiConfig = createConfig({ publicClient, connectors, autoConnect: true });

export const Web3Provider = ({ children }) => (
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} modalSize="compact" appInfo={{ appName: 'The Moment3!' }}>
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
