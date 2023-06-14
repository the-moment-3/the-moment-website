export interface Langpacks {
    [key: string]: string;
}
export interface Locale {
    [lang: string]: Langpacks;
}
interface Options {
    namespace?: string;
    fallbackLang?: string;
    lang?: string;
    locale?: Locale;
}
export interface OptionsParams extends Options {
    currentLang?: string;
}
export default class I18n {
    constructor(options?: OptionsParams);
    private locale;
    protected options: Options;
    private getKey;
    protected getMetaContent(key: string, lang: string): string | undefined;
    /**
     * 获取当前语言List,应用语言包的仲裁.如当前语言zh-CN\fallback en-US，则查找顺序为[zh-CN][zh][en-US]
     * @param lang 为空，则使用设置的lang与fallbackLang 解析合并
     */
    private getLangList;
    private format;
    /**
     * 设置当前语言
     * @param lang 语言（标准格式 zh-CN）
     */
    setLang(lang: string): void;
    /**
     * 设置语言包，原语言包将被清楚
     * @param locale
     * @param keyIncludeNamespace
     */
    setLocale(locale: Locale, keyIncludeNamespace?: boolean): void;
    /**
     * 更新语言包Locale，在原包基础上进行更新
     * @param locale
     * @param keyIncludeNamespace
     */
    updateLocale(locale: Locale, keyIncludeNamespace?: boolean): void;
    /**
     * 更新单个语言包
     * @param lang 语言
     * @param langpacks 语言包{[key]:value}
     * @param keyIncludeNamespace key中是否包含namesplace
     */
    updateLangpacks(lang: string, langpacks: Langpacks, keyIncludeNamespace?: boolean): void;
    /**
     * 是否存在key
     * @param key 要检查的文案key
     * @param lang 文案语言
     */
    isExist(key: any, lang?: string): boolean;
    /**
     * 获取文案
     * @param key  要获取的文案key
     * @param lang 要获取的文案语言（如果指定lang，则不会执行兜底文案逻辑）
     * @param data 文字内的数据（温暖内含有数据是会执行）
     */
    get(key: string, lang?: string, data?: Array<string | number> | Object): string | undefined;
}
export {};
