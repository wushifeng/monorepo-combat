// faas/s3/store.constants.ts
import { dirname, join } from './deps.ts';

//windows运行时路径出现 \D:\work\prod\ 这种多余的\
// 当前模块的目录
const __dirname = dirname(new URL(import.meta.url).pathname);
// 文件的存储目录
let urlPathname = join(__dirname, 'store');
urlPathname = Deno.build.os === "windows" ? urlPathname.slice(1) : urlPathname;
export const storeDir = urlPathname;
// 日志的存储目录
urlPathname = join(__dirname, 'log');
urlPathname = Deno.build.os === "windows" ? urlPathname.slice(1) : urlPathname;
export const logDir = urlPathname;
