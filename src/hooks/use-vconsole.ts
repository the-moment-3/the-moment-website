import { useEffect } from 'react';
import { useSearchParams } from 'ice';
import { isMobile } from 'react-device-detect';
import { isProd, isPre, HTTP_API_HOST } from '@/constants';
import loadScript from 'load-script';

const egg = `
|ˉˉˉˉˉˉˉˉˉˉˉ| /ˉˉˉˉˉˉˉˉ\\ |ˉˉˉˉˉˉˉˉˉˉˉ||ˉˉˉˉˉˉˉˉˉˉ||ˉˉˉ\\    |ˉ||ˉˉˉˉˉˉˉˉˉˉˉ||ˉˉˉˉˉˉˉˉˉˉ\\
| |ˉˉ| |ˉˉ| |/ /ˉˉˉˉˉˉ\\ \\| |ˉˉ| |ˉˉ| || |ˉˉˉˉˉˉˉˉ | |\\ \\   | | ˉˉˉˉ| |ˉˉˉˉ  ˉˉˉˉˉˉˉˉ| |
| |  | |  | || |      | || |  | |  | ||  ˉˉˉˉˉˉˉˉ|| | \\ \\  | |     | |     |ˉˉˉˉˉˉˉˉ  /
| |  | |  | || |      | || |  | |  | || |ˉˉˉˉˉˉˉˉ | |  \\ \\ | |     | |      ˉˉˉˉˉˉˉˉ| \\
| |  | |  | |\\ \\      / /| |  | |  | || |         | |   \\ \\| |     | |              / |
| |  | |  | | \\ ˉˉˉˉˉˉ / | |  | |  | ||  ˉˉˉˉˉˉˉˉ|| |    \\ ˉ |     | |     |ˉˉˉˉˉˉˉˉ  /
ˉˉˉ  ˉˉˉ  ˉˉˉ  ˉˉˉˉˉˉˉˉ  ˉˉˉ  ˉˉˉ  ˉˉˉ ˉˉˉˉˉˉˉˉˉˉ  ˉ      ˉˉˉ      ˉˉˉ      ˉˉˉˉˉˉˉˉˉˉ
Every Moment is Non-Fungible.
`;

export function useVConsole() {
  const [searchParams] = useSearchParams();

  // 在手机端开发环境，或使用参数，注入 VConsole
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

  // 控制台彩蛋
  useEffect(() => {
    if (isProd || isPre) {
      console.log(egg);
    }
  }, []);
}
