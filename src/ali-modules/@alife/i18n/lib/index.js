"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var until_1 = require("./until");
var I18n = /** @class */ (function () {
    function I18n(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.locale = {};
        this.options = {};
        var namespace = options.namespace, fallbackLang = options.fallbackLang, _a = options.currentLang, currentLang = _a === void 0 ? "en_US" : _a, _b = options.lang, lang = _b === void 0 ? currentLang : _b, locale = options.locale;
        if (fallbackLang) {
            this.options.fallbackLang = until_1.langKeyToStandard(fallbackLang);
        }
        this.options.lang = until_1.langKeyToStandard(lang);
        this.options.namespace = namespace;
        if (locale) {
            // 如果初始化时指定namespace，则langpacks中不包含namespace
            var keyIncludeNamespace_1 = !namespace;
            Object.keys(locale).forEach(function (lang) {
                _this.updateLangpacks(lang, locale[lang], keyIncludeNamespace_1);
            });
        }
    }
    I18n.prototype.getKey = function (key) {
        return this.options.namespace ? this.options.namespace + "." + key : key;
    };
    I18n.prototype.getMetaContent = function (key, lang) {
        var fullKey = this.getKey(key);
        if (lang) {
            var _lang = until_1.langKeyToStandard(lang);
            return this.locale[_lang] && this.locale[_lang][fullKey];
        }
        var langList = this.getLangList();
        for (var i = 0; i < langList.length; i++) {
            var _lang = langList[i];
            if (this.locale[_lang] && this.locale[_lang].hasOwnProperty(fullKey)) {
                return this.locale[_lang][fullKey];
            }
        }
    };
    /**
     * 获取当前语言List,应用语言包的仲裁.如当前语言zh-CN\fallback en-US，则查找顺序为[zh-CN][zh][en-US]
     * @param lang 为空，则使用设置的lang与fallbackLang 解析合并
     */
    I18n.prototype.getLangList = function () {
        var langList = until_1.langToList(this.options.lang.split("-"));
        if (this.options.fallbackLang && this.options.fallbackLang !== this.options.lang) {
            langList.push(this.options.fallbackLang);
        }
        return langList;
    };
    I18n.prototype.format = function (metaContent, context) {
        var ret = metaContent.replace(/\{\s*(?:([-\w]+)\s+)?([-\\.\w]+)(?:\s+([^}]+))*\s*\}/g, function ($1, helpername, key, param) {
            if (key === void 0) { key = helpername; }
            var ret = context[key];
            // 如果ret 不存在，则返回字符串本身
            ret = typeof ret === 'undefined' ? $1 : ret;
            return ret;
        });
        return ret;
    };
    /**
     * 设置当前语言
     * @param lang 语言（标准格式 zh-CN）
     */
    I18n.prototype.setLang = function (lang) {
        this.options.lang = until_1.langKeyToStandard(lang);
    };
    /**
     * 设置语言包，原语言包将被清楚
     * @param locale
     * @param keyIncludeNamespace
     */
    I18n.prototype.setLocale = function (locale, keyIncludeNamespace) {
        var _this = this;
        if (keyIncludeNamespace === void 0) { keyIncludeNamespace = true; }
        this.locale = {};
        Object.keys(locale).forEach(function (lang) {
            _this.updateLangpacks(lang, locale[lang], keyIncludeNamespace);
        });
    };
    /**
     * 更新语言包Locale，在原包基础上进行更新
     * @param locale
     * @param keyIncludeNamespace
     */
    I18n.prototype.updateLocale = function (locale, keyIncludeNamespace) {
        var _this = this;
        if (keyIncludeNamespace === void 0) { keyIncludeNamespace = true; }
        Object.keys(locale).forEach(function (lang) {
            _this.updateLangpacks(lang, locale[lang], keyIncludeNamespace);
        });
    };
    /**
     * 更新单个语言包
     * @param lang 语言
     * @param langpacks 语言包{[key]:value}
     * @param keyIncludeNamespace key中是否包含namesplace
     */
    I18n.prototype.updateLangpacks = function (lang, langpacks, keyIncludeNamespace) {
        var _this = this;
        if (keyIncludeNamespace === void 0) { keyIncludeNamespace = true; }
        var langKey = until_1.langKeyToStandard(lang);
        if (!keyIncludeNamespace) {
            this.locale[langKey] = this.locale[langKey] || {};
            Object.keys(langpacks).forEach(function (key) {
                _this.locale[langKey][_this.options.namespace + "." + key] = langpacks[key];
            });
        }
        else {
            var org = this.locale[langKey] || {};
            this.locale[langKey] = __assign(__assign({}, org), langpacks);
        }
    };
    /**
     * 是否存在key
     * @param key 要检查的文案key
     * @param lang 文案语言
     */
    I18n.prototype.isExist = function (key, lang) {
        if (lang === void 0) { lang = this.options.lang; }
        var fullKey = this.getKey(key);
        var _lang = until_1.langKeyToStandard(lang);
        return this.locale[_lang] && this.locale[_lang].hasOwnProperty(fullKey);
    };
    /**
     * 获取文案
     * @param key  要获取的文案key
     * @param lang 要获取的文案语言（如果指定lang，则不会执行兜底文案逻辑）
     * @param data 文字内的数据（温暖内含有数据是会执行）
     */
    I18n.prototype.get = function (key, lang, data) {
        var _lang = typeof lang === "string" ? lang : undefined;
        // return _lang
        var metaContent = this.getMetaContent(key, _lang);
        if (!metaContent) {
            return undefined;
        }
        var context = data ? data : typeof lang === "object" ? lang : undefined;
        if (context) {
            return this.format(metaContent, context);
        }
        return metaContent;
    };
    return I18n;
}());
exports.default = I18n;
;
