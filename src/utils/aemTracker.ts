declare global {
  interface Window {
    AES: any;
    AESPluginPV: any;
    AESPluginEvent: any;
    AESPluginAnimFluency: any;
  }
}

const aes = new window.AES({
  pid: 'web3',
  user_type: '13',
});

const plugins = aes.use([window.AESPluginPV, window.AESPluginEvent, window.AESPluginAnimFluency]);

export const sendEvent = plugins[1];
