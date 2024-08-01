import './02-deno-api-lifecycle.imported.ts';

const handler = (e: Event): void => {
  console.log(`{主脚本}:触发 ${e.type} 事件`);
};

globalThis.addEventListener('load', handler);
globalThis.addEventListener('beforeunload', handler);
globalThis.addEventListener('unload', handler);

globalThis.onload = (e: Event): void => {
  console.log(`{主脚本}:触发 ${e.type} 事件在 onload 函数`);
};

globalThis.onbeforeunload = (e: Event): void => {
  console.log(`{主脚本}:触发 ${e.type} 事件在 onbeforeunload 函数`);
};

globalThis.onunload = (e: Event): void => {
  console.log(`{主脚本}:触发 ${e.type} 事件在 onunload 函数`);
};

console.log('{主函数}：主函数触发打印日志');
