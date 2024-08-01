import { Application, Router, Context } from '../deps.ts';
import cfg from '../cfg.json' assert { type: 'json' };
import * as HealthCheck from './healthcheck/mod.ts';
import * as DB from './db/mod.ts';
import * as Registry from './registry/mod.ts';
import { redirect } from './redirect/mod.ts';

export async function start() {
  const router = new Router();
  router
    .get('/', (ctx) => ctx.response.redirect('./index.html'))
    .get('/index.html', (ctx) => sendLandingPage(ctx))
    .get('/v1/healthcheck', HealthCheck.getHandler)
    .get('/debug/db', DB.getHandler)
    .get('/v1/registry', Registry.getHandler)
    .post('/v1/registry', Registry.postHandler)
    .delete('/v1/registry', Registry.deleteHandler)
    .get('/register@0.1.0/mod.ts', (ctx) => sendPkgRegister(ctx, 'register@0.1.0/mod.ts'))
    .all('/api/(.*)', (ctx) => redirect(ctx));
    
  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log(`注册服务器运行在http://localhost:${cfg.serverPort}`);
  await app.listen(`localhost:${cfg.serverPort}`);
}

async function sendLandingPage(ctx: Context) {
  ctx.response.body = await Deno.readFile('./public/index.html');
  ctx.response.headers.set('Content-Type', 'text/html');
}
async function sendPkgRegister(ctx: Context, pkgPath: string) {
  ctx.response.body = await Deno.readFile(`./shared/${pkgPath}`);
  ctx.response.headers.set('Content-Type', 'application/typescript; charset=utf-8');
}
