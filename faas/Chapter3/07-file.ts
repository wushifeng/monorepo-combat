import { dirname, join } from 'https://deno.land/std@0.170.0/path/mod.ts';

console.log('开始：读取一个目录下的文件');
// windows git bash下路径格式不对
const baseDir = dirname(new URL(import.meta.url).pathname);
console.log('当前目录：', baseDir);
for await (const f of Deno.readDir(baseDir)) {
  if (!f.isFile) continue;
  console.log(f.name);
}
console.log('结束：读取一个目录下的文件');

console.log('开始：测试文件是否存在');
const newDir = join(baseDir, 'newDir/newSubDir');
try {
  const f = await Deno.open(newDir);
} catch (e) {
  if (e instanceof Deno.errors.NotFound) console.error('文件不存在');
}
try {
  const f = await Deno.stat(newDir);
} catch (e) {
  if (e instanceof Deno.errors.NotFound) console.error('文件不存在');
}
try {
  const s = await Deno.readTextFile(newDir);
} catch (e) {
  if (e instanceof Deno.errors.NotFound) console.error('文件不存在');
}
import { exists } from 'https://deno.land/std@0.170.0/fs/mod.ts';
// 官方已经废弃 exists
if (!(await exists(newDir))) {
  console.error('文件不存在');
}
console.log('结束：测试文件是否存在');

console.log('开始： mkdir -p');
try {
  await Deno.mkdir(newDir);
} catch (e) {
  console.log(e);
  // 相当于 mkdir -p
  await Deno.mkdir(newDir, { recursive: true });
}
console.log('结束： mkdir -p');
console.log('开始： 获取临时目录');
const getOSTempDir = () =>
  Deno.env.get('TMPDIR') || Deno.env.get('TMP') || Deno.env.get('TEMP') || '/tmp';

const tempDir = getOSTempDir();
console.log('临时文件夹是：', tempDir);

// 在 Deno 中给 globalThis 增加属性
Object.defineProperty(globalThis, 'tempDir', {
  value: tempDir,
  enumerable: true,
});

declare global {
  // deno-lint-ignore no-var
  var tempDir: string;
}
console.log('globalThis 的临时文件夹是：', globalThis.tempDir);
console.log('结束： 获取临时目录');
console.log('开始： 写入文件');
// 写入文件
const getFilePath = (fileName: string) => join(baseDir, `newDir/newSubDir/${fileName}.txt`);
await Deno.writeFile(getFilePath('a'), new TextEncoder().encode('Deno 写入的!'));
await Deno.writeTextFile(getFilePath('b'), '至尊宝对紫霞说：\n曾经\n有一份\n');
await Deno.writeTextFile(getFilePath('c'), JSON.stringify({ a: 1, b: 't' }));
console.log('结束： 写入文件');
console.log('开始： 写入文件');
console.log('开始： 一次性读取文件');
// 读取文件
const a = await Deno.readFile(getFilePath('a'));
console.log('a', new TextDecoder().decode(a));
const b = await Deno.readTextFile(getFilePath('b'));
console.log('b', b);
const c = await Deno.readTextFile(getFilePath('c'));
console.log('c', JSON.parse(c));
console.log('开始： 逐行读取文件');
import { readLines } from 'https://deno.land/std@0.170.0/io/read_lines.ts';
const f = await Deno.open(getFilePath('b'));
for await (const l of readLines(f)) console.log(l);
console.log('结束： 读取文件');
