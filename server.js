const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');

const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3006
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./sw.js').pipe(res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log('> Ready nau '+port);
  });
});