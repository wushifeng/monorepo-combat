import { Application, Router } from '../deps';
import cfg from '../cfg.json' assert {type: 'json'};
import * as HealthCheck from './healthcheck/mod.ts';

export async function start() {
    const router = new Router();
    // 为 /v1/healthcheck 路径指定 getHandler 函数
    router.get('/v1/healthcheck', HealthCheck,getHandler);

    const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());
    console.log('注册服务器运行在 http://localhost: ${cfg.serverPort}');
    await app.listen('localhost: ${cfg.serverPort}');
}