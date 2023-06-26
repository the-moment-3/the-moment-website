import { createModel } from 'ice';
import { GetOnchainDataResponse, getOnchainData } from '@/services/korea-nft/onchain-data';
import { GetOnchainUserDataResponse, getOnchainUserData } from '@/services/korea-nft/onchain-user-data';

export type OnchainData = GetOnchainDataResponse & GetOnchainUserDataResponse;

export default createModel({
  state: {
    contractAddress: '',
    collectionSize: 0,
    perAddressMaxMintAmount: 0,
    taskStartTime: 0,
    taskEndTime: 0,
    lotteryTime: 0,
    allowListStartTime: 0,
    allowListEndTime: 0,
    allowListPrice: 0,
    publicStartTime: 0,
    publicPrice: 0,
    publicDisplayPrice: 0,
    totalMintedAmount: 0,
    addressMintedAmount: 0,
    allowListRemainAmount: 0,
    allowListTotalAmount: 0,
    allowListMerkleProof: [],
  } as OnchainData,
  reducers: {
    update(state, payload: Partial<OnchainData>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: () => ({
    fetchData() {
      this.fetchOnchainData();
      this.fetchOnchainUserData();
    },
    async fetchOnchainData() {
      try {
        const onchainData = await getOnchainData();
        this.update(onchainData);
      } catch (e) {
        console.log('[models/onchain] fetchOnchainData error:', e);
      }
    },
    async fetchOnchainUserData() {
      try {
        const onchainUserData = await getOnchainUserData();
        this.update(onchainUserData);
      } catch (e) {
        console.log('[models/onchain] fetchOnchainUserData error:', e);
      }
    },
  }),
});
