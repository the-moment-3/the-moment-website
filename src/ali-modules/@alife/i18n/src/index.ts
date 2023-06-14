import { langToList, langKeyToStandard } from "./until";

export interface Langpacks {
  [key: string]: string
}
export interface Locale {
  [lang: string]: Langpacks
}
interface Options {
  namespace?: string,
  fallbackLang?: string,
  lang?: string,
  locale?: Locale
}
export interface OptionsParams extends Options {
  currentLang?: string,
}
export default class I18n {
  constructor(options: OptionsParams = {}) {
    const {
      namespace,
      fallbackLang,
      currentLang = "en_US",
      lang = currentLang,
      locale
    } = options
    if (fallbackLang) {
      this.options.fallbackLang = langKeyToStandard(fallbackLang);
    }
    this.options.lang = langKeyToStandard(lang)
    this.options.namespace = namespace;
    if (locale) {
      // 如果初始化时指定namespace，则langpacks中不包含namespace
      const keyIncludeNamespace = !namespace
      Object.keys(locale).forEach(lang => {
        this.updateLangpacks(lang, locale[lang], keyIncludeNamespace)
      })
    }
  }
  private locale: Locale = {}
  protected options: Options = {}
  private getKey(key): string {
    return this.options.namespace ? this.options.namespace + "." + key : key;
  }
  protected getMetaContent(key: string, lang: string): string | undefined {
    const fullKey = this.getKey(key);
    if (lang) {
      const _lang = langKeyToStandard(lang);
      return this.locale[_lang] && this.locale[_lang][fullKey]
    }
    const langList = this.getLangList();

    for (var i = 0; i < langList.length; i++) {
      const _lang = langList[i];
      if (this.locale[_lang] && this.locale[_lang].hasOwnProperty(fullKey)) {
        return this.locale[_lang][fullKey]
      }
    }
  }
  /**
   * 获取当前语言List,应用语言包的仲裁.如当前语言zh-CN\fallback en-US，则查找顺序为[zh-CN][zh][en-US]
   * @param lang 为空，则使用设置的lang与fallbackLang 解析合并
   */
  private getLangList(): Array<string> {
    const langList = langToList(this.options.lang.split("-"));
    if (this.options.fallbackLang && this.options.fallbackLang !== this.options.lang) {
      langList.push(this.options.fallbackLang)
    }
    return langList
  }
  private format(metaContent: string, context) {
    let ret = metaContent.replace(/\{\s*(?:([-\w]+)\s+)?([-\\.\w]+)(?:\s+([^}]+))*\s*\}/g, ($1, helpername, key = helpername, param) => {
      let ret = context[key];
      // 如果ret 不存在，则返回字符串本身
      ret = typeof ret === 'undefined' ? $1 : ret;
      return ret;
    });
    return ret;
  }

  /**
   * 设置当前语言
   * @param lang 语言（标准格式 zh-CN）
   */
  setLang(lang: string) {
    this.options.lang = langKeyToStandard(lang)
  }
  /**
   * 设置语言包，原语言包将被清楚
   * @param locale 
   * @param keyIncludeNamespace 
   */
  setLocale(locale: Locale, keyIncludeNamespace = true) {
    this.locale = {};
    Object.keys(locale).forEach(lang => {
      this.updateLangpacks(lang, locale[lang], keyIncludeNamespace)
    })
  }
  /**
   * 更新语言包Locale，在原包基础上进行更新
   * @param locale
   * @param keyIncludeNamespace 
   */
  updateLocale(locale: Locale, keyIncludeNamespace: boolean = true): void {
    Object.keys(locale).forEach(lang => {
      this.updateLangpacks(lang, locale[lang], keyIncludeNamespace)
    })
  }
  /**
   * 更新单个语言包
   * @param lang 语言
   * @param langpacks 语言包{[key]:value}
   * @param keyIncludeNamespace key中是否包含namesplace
   */
  updateLangpacks(lang: string, langpacks: Langpacks, keyIncludeNamespace = true): void {
    const langKey = langKeyToStandard(lang);
    if (!keyIncludeNamespace) {
      this.locale[langKey] = this.locale[langKey] || {}
      Object.keys(langpacks).forEach(key => {
        this.locale[langKey][this.options.namespace + "." + key] = langpacks[key]
      });
    } else {
      const org = this.locale[langKey] || {};
      this.locale[langKey] = {
        ...org, ...langpacks
      }
    }
  }
  /**
   * 是否存在key
   * @param key 要检查的文案key
   * @param lang 文案语言
   */
  isExist(key, lang: string = this.options.lang): boolean {
    const fullKey = this.getKey(key);
    const _lang = langKeyToStandard(lang);
    return this.locale[_lang] && this.locale[_lang].hasOwnProperty(fullKey)
  }
  /**
   * 获取文案
   * @param key  要获取的文案key
   * @param lang 要获取的文案语言（如果指定lang，则不会执行兜底文案逻辑）
   * @param data 文字内的数据（温暖内含有数据是会执行）
   */
  get(key: string, lang?: string, data?: Array<string | number> | Object): string | undefined {
    const _lang = typeof lang === "string" ? lang : undefined;
    // return _lang
    const metaContent = this.getMetaContent(key, _lang);
    if (!metaContent) {
      return undefined
    }
    const context = data ? data : typeof lang === "object" ? lang : undefined;
    if (context) {
      return this.format(metaContent, context)
    }
    return metaContent;
  }
};
