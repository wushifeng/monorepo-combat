// faas/Chapter4/03-fetch.ts
// 使用 fetch 获取本地文件数据
const response = await fetch(new URL('./package.json', import.meta.url));
const packageJson = await response.json();
console.log(packageJson);
// 官方 fetch 示例
// 输出: JSON 数据
const jsonResponse = await fetch('https://api.github.com/users/denoland');
const jsonData = await jsonResponse.json();
console.log(jsonData);

// 输出: HTML 数据
const textResponse = await fetch('https://deno.land/');
const textData = await textResponse.text();
console.log(textData);

// 输出: Error 信息
try {
  await fetch('https://does.not.exist/');
} catch (error) {
  console.log(error);
}
