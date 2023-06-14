import { createModel } from 'ice';
import { LANGUAGES, TIMEZONE, TIMEZONE_ABBR } from '@/constants/i18n';

export default createModel({
  state: {
    lang: LANGUAGES.KO,
    time: { timezone: TIMEZONE.KST, timezoneAbbr: TIMEZONE_ABBR.KST },
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
