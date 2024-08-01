import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
const router = new Router();
router.post('/hello', async (context) => {
  const reqJson = await context.request.body().value;
  context.response.body = { text: `你的名字是${reqJson.name}` };
});
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log('服务已启动： http://localhost:8000');
await app.listen({ port: 8000 });

// curl -X POST -H "Content-Type: application/json" -d '{"name": "alex"}' http://localhost:8000/hello