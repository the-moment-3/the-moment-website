var i18n = {};
var defaultLocale = 'en-us';

i18n['en-us'] = require('./en-us.js');

i18n['ko-kr'] = require('./ko-kr.js');


for (var locale in i18n) {
  if(!i18n.hasOwnProperty(locale)){
    continue;
  }
  if(locale == defaultLocale){
    continue;
  }
  for(var key in i18n[defaultLocale]){
    if(!i18n[defaultLocale].hasOwnProperty(key)){
      continue;
    }
    if(!i18n[locale].hasOwnProperty(key)){
      i18n[locale][key] = i18n[defaultLocale][key];
    }
  }
}

//把其它信息也加上去
i18n.appName = 'NFTwebsite';
i18n.groupName = 'pc';
i18n.defaultLocale = defaultLocale;

module.exports = i18n;

