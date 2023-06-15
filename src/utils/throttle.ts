export function throttle(fn: Function, wait: number): Function {
  let pre = new Date();
  return function (this: any, ...args: any[]) {
    let context = this;
    let now = new Date();
    if (now.getTime() - pre.getTime() >= wait) {
      fn.apply(context, args);
      pre = now;
    }
  };
}
