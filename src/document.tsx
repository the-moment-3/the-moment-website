import { Links, Main, Meta, Scripts, Title } from 'ice';

const arms = `
  !(function(c,b,d,a){c[a]||(c[a]={});c[a].config=
    {
      pid:"avw4dzhvpw@a3b8db0f9e4b658",
      appType:"web",
      imgUrl:"https://arms-retcode-sg.aliyuncs.com/r.png?",
      sendResource:true,
      enableLinkTrace:true,
      behavior:true,
      enableSPA:true,
      useFmp:true,
      enableConsole:true
    };
  with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
  })(window,document,"https://sdk.rum.aliyuncs.com/v1/bl.js","__bl");
`;

const aplus = `
  (function(w, d, s, q, i) {
      w[q] = w[q] || [];
      var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
      j.async = true;
      j.id = 'beacon-aplus';
      j.setAttribute('exparams','userid=&aplus&sidx=aplusSidex&ckx=aplusCkx');
      j.src = "//g.alicdn.com/alilog/mlog/aplus_v2.js";
      j.crossorigin = 'anonymous';
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'aplus_queue');
`;

export default () => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <meta name="aplus-core" content="aplus.js" />
      <meta name="aplus-rhost-g" content="sg.mmstat.com/alicloud" />
      <Meta />
      <Title />
      <Links />
    </head>
    <body>
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: arms }} />
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: aplus }} />
      <script src="//g.alicdn.com/aes/??tracker/3.0.0/index.js,tracker-plugin-pv/3.0.1/index.js,tracker-plugin-event/3.0.0/index.js,tracker-plugin-animFluency/3.0.0/index.js"></script>
      <Main />
      <Scripts />
    </body>
  </html>
);
