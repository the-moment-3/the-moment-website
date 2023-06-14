import { defineAppConfig } from 'ice';

export default defineAppConfig(() => ({
  router: {
    type: 'hash',
    basename: '/', // 部署到 WebApp 之后要强制设置一下 basename
  },
}));
