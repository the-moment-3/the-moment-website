import { useEffect } from 'react';
import { useSearchParams } from 'ice';
import { isMobile } from 'react-device-detect';
import { isProd, HTTP_API_HOST } from '@/constants';
import loadScript from 'load-script';

// 在手机端开发环境，或使用参数，注入 VConsole

export function useVConsole() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if ((isMobile && !isProd) || searchParams.get('vconsole') === '1') {
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
        }
      });
    }
  }, []);
}
