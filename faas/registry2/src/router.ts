import { Application, Router } from '../deps.ts';
import cfg from '../cfg.json' with {type: 'json'};
import * as HealthCheck from './healthcheck/controller/mod.ts';
import * as DB from './db/mod.ts';

export async function start() {
    const router = new Router();
    // 为 /v1/healthcheck 路径指定 getHandler 函数
    router
        .get('/v1/healthcheck', HealthCheck.getHandler)
        // debug的服务端点
        .get('/debug/db', DB.getHandler);

    const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());
    console.log(`注册服务器运行在 http://localhost:${cfg.serverPort}`);
    await app.listen(`localhost:${cfg.serverPort}`);
}