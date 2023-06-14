import * as mdsLangPacks from '@/ali-modules/@alife/mcms_NFTwebsite_pc';
import i18nTranslate from '@/ali-modules/@alife/i18n';
import store from '@/store';

export const useI18n = () => {
  const [{ lang }] = store.useModel('i18n');

  return new i18nTranslate({
    lang: lang,
    locale: mdsLangPacks,
  });
};
