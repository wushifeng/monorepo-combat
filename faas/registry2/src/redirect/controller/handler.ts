import { Context, Status } from '../../../deps.ts';
import { getTargetUrl } from '../service/get-original-url.ts';

export async function redirect(ctx: Context) {
  console.log('当前请求的 url 是', ctx.request.url.href);
  console.log(ctx.request.url);

  const subUrl = ctx.request.url.pathname.replace('/api', '');
  const search = ctx.request.url.search;
  let targetUrl;
  try {
    targetUrl = `${getTargetUrl(subUrl)}${search}`;
    console.log('目标的 url 是', targetUrl);
  } catch (e) {
    ctx.response.status = Status.InternalServerError;
    if (e instanceof Deno.errors.NotFound) {
      ctx.response.body = {
        errMsg: '提供的 URL 还没有注册!',
      };
    }
    return;
  }

  let res;
  // 只支持 json 格式的 body 请求，其他认为没有 body
  console.log(ctx.request.headers.get('content-type'));
  console.log(ctx.request.hasBody);
  if (ctx.request.headers.get('content-type') === 'application/json' && ctx.request.hasBody) {
    const reqBody = ctx.request.body();
    console.log(reqBody);
    if (reqBody.type !== 'json') {
      ctx.response.status = Status.UnsupportedMediaType;
      return;
    }
    res = await fetch(targetUrl, {
      method: ctx.request.method,
      headers: ctx.request.headers,
      body: JSON.stringify(await reqBody.value),
    });
  } else {
    res = await fetch(targetUrl, {
      method: ctx.request.method,
      headers: ctx.request.headers,
    });
  }
  // 子服务只支持 OK 为成功的状态码
  if (res.status !== Status.OK) {
    ctx.response.status = res.status;
    ctx.response.body = res.body;
    return;
  }
  if (res.headers.get('content-type') === 'application/json') {
    ctx.response.body = await res.json();
  } else {
    ctx.response.body = await res.text();
  }
}
