declare function memoDecorate(fn: any): (...args: any[]) => any;
declare const langToList: (...args: any[]) => any;
declare const langKeyToStandard: (...args: any[]) => any;
export { langToList, langKeyToStandard, memoDecorate };
