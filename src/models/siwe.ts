import { createModel } from 'ice';

export default createModel({
  state: {
    address: '',
    shortAddress: '',
    loading: false,
    autoSignInFinished: false,
  },
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});
