import { Links, Main, Meta, Scripts, Title } from 'ice';

export default () => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <Meta />
      <Title />
      <Links />
    </head>
    <body>
      <Main />
      <Scripts />
    </body>
  </html>
);
