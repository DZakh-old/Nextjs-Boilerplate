/* eslint-disable lodash/prefer-lodash-method */
/* eslint-disable no-console */

const fs = require('fs');
const https = require('https');

const cookieParser = require('cookie-parser');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');

let key = null;
let cert = null;
try {
  key = fs.readFileSync('./certificates/key.pem');
  cert = fs.readFileSync('./certificates/cert.pem');
} catch (err) {
  // Do nothing
}

const isHttps = Boolean(key && cert);
const protocol = isHttps ? 'https:' : 'http:';
const port = Number(process.env.PORT) || 3000;

const isTryStart = Boolean(process.env.APP_IS_TRY_START);
const environment = isTryStart ? 'development' : process.env.NODE_ENV;

require('dotenv').config({ path: `./.env.${environment}` });

const isDevelopment = environment === 'development';

const devProxy = {
  '/api': {
    target: process.env.NEXT_PUBLIC_API_HOST_URL,
    cookieDomainRewrite: {
      '*': 'localhost',
    },
    protocol,
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  },
};

const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev: isTryStart ? false : isDevelopment,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    server.use(cookieParser());

    // Set up the proxy.
    if (isDevelopment && devProxy) {
      Object.keys(devProxy).forEach((context) => {
        server.use(context, createProxyMiddleware(devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    const httpServer = isHttps ? https.createServer({ key, cert }, server) : server;
    httpServer.listen(port, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on port ${port} [${environment}]`);
      if (isDevelopment) {
        console.log(`${protocol}//localhost:${port}/`);
      }
    });
  })
  .catch((err) => {
    console.error('An error occurred, unable to start the server', err);
  });
