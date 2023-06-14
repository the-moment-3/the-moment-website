import { defineConfig } from '@ice/app';
import request from '@ice/plugin-request';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import store from '@ice/plugin-store';

export default defineConfig(() => ({
  minify: process.env.NODE_ENV === 'production' ? 'swc' : false,
  ssr: false,
  ssg: false,
  server: {
    onDemand: true,
    format: 'esm',
  },
  webpack: (webpackConfig) => {
    // for siwe
    webpackConfig.plugins?.push(new NodePolyfillPlugin());
    // @ts-ignore
    webpackConfig.resolve.fallback.net = false;
    // @ts-ignore
    webpackConfig.resolve.fallback.tls = false;
    // @ts-ignore
    webpackConfig.resolve.fallback.fs = false;
    return webpackConfig;
  },
  plugins: [request(), store()],
}));
