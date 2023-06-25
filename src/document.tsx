import { Links, Main, Meta, Scripts, Title } from 'ice';

// ARMS 前端监控文档
// https://help.aliyun.com/document_detail/58663.html
// https://help.aliyun.com/document_detail/58657.html
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
    };
  with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
  })(window,document,"https://sdk.rum.aliyuncs.com/v1/bl.js","__bl");
`;

export default () => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <link rel="icon" href="/favicon.ico" />
      <Meta />
      <Title />
      <Links />
    </head>
    <body>
      <Main />
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: arms }} />
      <Scripts />
    </body>
  </html>
);
