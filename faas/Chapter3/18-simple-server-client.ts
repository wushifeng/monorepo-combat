import { Status } from 'https://deno.land/std@0.182.0/http/mod.ts';
// 创建 Headers
const headers = new Headers({ Authorization: 'Bearer my_auth' });
// 使用 URLSearchParams 创建请求参数
const q = new URLSearchParams({ userId: '1' });
// 创建请求
const res = await fetch('http://localhost:8000/users/search?' + q, { method: 'POST', headers });
// 处理响应
if (res.status == Status.OK && res.headers.get('content-type')?.startsWith('application/json')) {
  console.log(await res.json());
}
