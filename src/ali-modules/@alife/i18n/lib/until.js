"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function memoDecorate(fn) {
    var Cache = [];
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = JSON.stringify(args);
        if (!Cache[key]) {
            Cache[key] = fn.bind(this).apply(void 0, args);
        }
        return Cache[key];
    };
}
exports.memoDecorate = memoDecorate;
var langToList = memoDecorate(function (lang) {
    if (lang.length > 1) {
        lang.forEach(function (item, i) {
            if (i > 0) {
                lang[i] = lang[i - 1] + "-" + item;
            }
        });
        return lang.reverse();
    }
    else {
        return lang;
    }
});
exports.langToList = langToList;
var langKeyToStandard = memoDecorate(function (lang) {
    return lang.replace(/([a-z]{2})[-_]([A-z]{2})/, function ($0, $1, $2) { return $1.toLowerCase() + "-" + $2.toUpperCase(); });
});
exports.langKeyToStandard = langKeyToStandard;
