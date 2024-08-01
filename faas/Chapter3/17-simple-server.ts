import { serve, Status } from 'https://deno.land/std@0.182.0/http/mod.ts';

async function reqHandler(req: Request) {
  if (
    !req.headers.has('Authorization') ||
    // 使用 Deno 内置的环境变量功能获取当前的鉴权密钥
    req.headers.get('Authorization')?.split(' ')[1] !== Deno.env.get('AUTH_TOKEN')
  ) {
    // 进行鉴权，密钥在环境变量中
    return new Response(null, { status: Status.Unauthorized });
  }
  if (req.method !== 'POST') {
    // 仅处理 POST 请求
    return new Response(null, { status: Status.MethodNotAllowed });
  }
  const { pathname: path, searchParams: query } = new URL(req.url);
  if (path !== '/users/search') {
    // 仅允许 /users/search 路径
    return new Response(null, { status: Status.NotFound });
  }

  const userId = query.get('userId');
  if (!userId) {
    // 必须有 userId 参数
    return new Response(null, { status: Status.BadRequest });
  }
  const userObj = JSON.parse(await Deno.readTextFile('./db.json'))[userId];
  if (!userObj) {
    // 未找到用户
    return new Response(null, { status: Status.NoContent });
  }

  // 返回找到的 json，并且把 Header 置为 application/json
  return new Response(JSON.stringify(userObj), {
    headers: {
      'content-type': 'application/json',
    },
  });
}
serve(reqHandler, { port: 8000 });
