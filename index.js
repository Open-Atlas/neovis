const Koa = require('koa');
const Router = require('@koa/router');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(helmet());

const { createReadStream } = require('fs');

router.get('/', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream('neovis.html');
});

router.use((ctx) => {
  ctx.response.status = 404;
});

app.use(router.routes());

app.on('error', (e) => {
  // headers data makes Koa crash during error handling
  e.headers = {};
  console.error(e);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {});
console.log('listening on port ' + port);
