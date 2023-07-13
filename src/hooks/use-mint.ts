import { useState } from 'react';
import { message } from 'antd';
import { providers, Contract } from 'ethers';
import { useWalletClient, WalletClient } from 'wagmi';
import { mintChannel } from '@/services/korea-nft/mint-channel';

const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'allowListTotalAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'allowListMerkleProof',
        type: 'bytes32[]',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

interface MintParams {
  contractAddress: string;
  args: {
    amount: number;
    allowListTotalAmount: number;
    allowListMerkleProof: Buffer[];
  };
  value?: number;
  channelCode?: string;
}

// https://wagmi.sh/react/ethers-adapters
function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useMint({ contractAddress, args, value = 0, channelCode = '' }: MintParams) {
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: walletClient } = useWalletClient();

  const mint = async () => {
    if (!walletClient) throw new Error('Missing wallet client.');
    if (!contractAddress) throw new Error('Missing contract address.');
    if (args.amount <= 0) throw new Error('Mint amount must be positive.');
    console.log('[mint] contract:', contractAddress);
    console.log('[mint] value:', value);
    console.log('[mint] args:', args);
    setLoading(true);
    let txHash = '';
    // 发起铸造请求
    try {
      const signer = walletClientToSigner(walletClient);
      const contract = new Contract(contractAddress, abi, signer);
      const tx = await contract.mint(
        args.amount,
        args.allowListTotalAmount,
        args.allowListMerkleProof.map((buffer) => '0x' + Buffer.from(buffer).toString('hex')),
        { value },
      );
      await tx.wait();
      txHash = tx.hash;
    } catch (e) {
      message.error('Mint failed.');
      console.log('[mint] error:', e);
    }
    // 记录渠道号
    if (txHash) {
      try {
        await mintChannel({
          txHash,
          value,
          mintAmount: args.amount,
          channelCode,
        });
      } catch (e) {
        console.log('[mint] record channel error:', e);
      }
    }
    setTxHash(txHash);
    setLoading(false);
  };

  return { mint, txHash, loading };
}
