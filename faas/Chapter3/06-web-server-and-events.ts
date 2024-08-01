import { serve } from 'https://deno.land/std@0.170.0/http/mod.ts';
import { someFunc } from './06-app-mod.ts';
someFunc();

const port = 8380;

const handler = (request: Request): Response => {
  dispatchEvent(new Event('httpRequestEvent'));
  const body = `你的 user-agent 是:\n\n${request.headers.get('user-agent') ?? 'Unknown'}`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP web 服务器已经启动，请访问: http://localhost:${port}/`);
await serve(handler, { port });
