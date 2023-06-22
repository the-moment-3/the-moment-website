import { createModel } from 'ice';

export default createModel({
  state: {
    address: '',
    shortAddress: '',
    autoConnectFinished: false,
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
