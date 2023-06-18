import { createModel } from 'ice';
import { LANGUAGES, TIMEZONE, TIMEZONE_ABBR } from '@/constants/i18n';

export default createModel({
  state: {
    lang: LANGUAGES.EN,
    time: { timezone: TIMEZONE.EST, timezoneAbbr: TIMEZONE_ABBR.EST },
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
