/* eslint-disable lodash/prefer-lodash-method */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const cookieParser = require('cookie-parser');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');

const devProxy = {
  '/v1': {
    target: 'https://your.back.end.com',
    cookieDomainRewrite: {
      '*': 'localhost',
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

const port = Number(process.env.PORT) || 3000;
const env = process.env.NODE_ENV;
const dev = env === 'development';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    server.use(cookieParser());

    // Set up the proxy.
    if (dev && devProxy) {
      Object.keys(devProxy).forEach((context) => {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
      if (dev) {
        console.log(`http://localhost:${port}/`);
      }
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
