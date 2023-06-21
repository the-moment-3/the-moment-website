type evokeCallback = () => void;
type evokeResult = 'success' | 'fail' | 'cancel';
type evokeComplete = (type: evokeResult) => void;
type evokeOptions = {
  method?: 'alink' | 'iframe' | 'href';
  timeout?: number;
  success?: evokeCallback; // 唤端成功，指定时间内页面隐藏
  fail?: evokeCallback; // 唤端失败，指定时间内页面未隐藏
  cancel?: evokeCallback; // 唤端取消，超时时间内，页面直接关闭，此时我们不知道是否最终会唤端成功
  complete?: evokeComplete; // 唤端结束
};

const alink = (appSchema: string) => {
  const a = document.createElement('a');
  a.setAttribute('href', appSchema);
  a.setAttribute('target', '_self');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
};

const iframe = (appSchema: string) => {
  const iframe = document.createElement('iframe');
  iframe.frameBorder = '0';
  iframe.style.cssText = 'display:none;border:0;width:0px;height:0px;';
  document.body.appendChild(iframe);
  iframe.src = appSchema;
};

const href = (appSchema: string) => {
  location.href = appSchema; // 无论如何先执行一次
  if (document.readyState !== 'complete') {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        location.href = appSchema;
      }
    });
  }
};

const callMethods = {
  alink,
  iframe,
  href,
};

const DEFAULT_TIMEOUT = 3500;

export const evoke = (appSchema: string, options: evokeOptions) => {
  const { method = 'href', timeout = DEFAULT_TIMEOUT, success, fail, cancel, complete } = options;
  const wrapEvokeCallback = (type: evokeResult, callback?: evokeCallback) => () => {
    // 清理失败/取消监听，避免重复触发
    clearListen();
    try {
      callback?.();
    } finally {
      complete?.(type);
    }
  };

  listenEvokeSucc(wrapEvokeCallback('success', success));
  listenEvokeFail(wrapEvokeCallback('fail', fail), timeout);
  listenEvokeCancel(wrapEvokeCallback('cancel', cancel));
  const choseMethod = callMethods[method] || href;
  choseMethod(appSchema);
};

let hidden: 'hidden' | 'msHidden' | 'webkitHidden';
let visibilityChange: string;
if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof (document as any).msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof (document as any).webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

const isPageHidden: () => boolean = () => {
  return document[hidden];
};

let failTimer: number;
let clearEvokeSuccListen = () => {};
const clearEvokeFailListen = () => {
  window.clearTimeout(failTimer);
};
let clearEvokeCancel = () => {};
const clearListen = () => {
  clearEvokeSuccListen();
  clearEvokeFailListen();
  clearEvokeCancel();
};

const listenEvokeSucc = (callback: evokeCallback) => {
  const succCB = () => {
    if (isPageHidden()) {
      callback();
    }
  };
  if (typeof visibilityChange !== 'undefined') {
    document.addEventListener(visibilityChange, succCB);
    clearEvokeSuccListen = () => {
      document.removeEventListener(visibilityChange, succCB);
    };
  } else {
    window.addEventListener('pagehide', succCB);
    clearEvokeSuccListen = () => {
      window.removeEventListener('pagehide', succCB);
    };
  }
};

const listenEvokeFail = (callback: evokeCallback, timeout: number) => {
  failTimer = window.setTimeout(() => {
    if (!isPageHidden()) {
      callback();
    }
  }, timeout);
};

const listenEvokeCancel = (callback: evokeCallback) => {
  window.addEventListener('unload', callback, false);
  clearEvokeCancel = () => {
    window.removeEventListener('unload', callback);
  };
};
