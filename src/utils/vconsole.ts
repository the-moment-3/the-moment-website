import loadScript from 'load-script';
import { isProd, HTTP_API_HOST } from '@/constants';
import { isCookieEnabled } from './cookie';

export function initVConsole() {
  loadScript('https://unpkg.com/vconsole@latest/dist/vconsole.min.js', (e) => {
    if (e) {
      console.log('[vconsole] load error:', e);
    } else {
      // @ts-ignore
      new window.VConsole();
      console.log('[vconsole] load success.');
      console.log('isProd:', isProd);
      console.log('HTTP_API_HOST:', HTTP_API_HOST);
      console.log('host:', window.location.host);
      console.log('userAgent:', navigator.userAgent);
      console.log('isCookieEnabled:', isCookieEnabled());
    }
  });
}
