function memoDecorate(fn) {
    const Cache = []
    return function (...args) {
        const key = JSON.stringify(args);
        if (!Cache[key]) {
            Cache[key] = fn.bind(this)(...args)
        }
        return Cache[key]
    }
}
const langToList = memoDecorate((lang) => {
    if (lang.length > 1) {
        lang.forEach((item, i) => {
            if (i > 0) {
                lang[i] = lang[i - 1] + "-" + item
            }
        })
        return lang.reverse()
    } else {
        return lang
    }
})
const langKeyToStandard = memoDecorate((lang) => {
    return lang.replace(/([a-z]{2})[-_]([A-z]{2})/, ($0, $1, $2) => $1.toLowerCase() + "-" + $2.toUpperCase());
})
export {
    langToList,
    langKeyToStandard,
    memoDecorate
}