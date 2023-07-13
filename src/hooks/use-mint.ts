import { useState } from 'react';
import { message } from 'antd';
import { utils } from 'ethers';
import { usePublicClient, useWalletClient } from 'wagmi';
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

export function useMint({ contractAddress, args, value = 0, channelCode = '' }: MintParams) {
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

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
      const [walletAddress] = await walletClient.getAddresses();
      const { request } = await publicClient.simulateContract({
        account: walletAddress,
        address: contractAddress as `0x${string}`,
        functionName: 'mint',
        abi,
        args: [
          args.amount,
          args.allowListTotalAmount,
          // viem 需要把 buffer 转成 hex 字符串，不然会报错
          args.allowListMerkleProof.map((buffer) => '0x' + Buffer.from(buffer).toString('hex')),
        ],
        // @ts-ignore
        // TODO: TypeError: Cannot convert a BigInt value to a number
        // value: utils.parseEther(value.toString()),
        value,
      });
      txHash = await walletClient.writeContract(request);
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
