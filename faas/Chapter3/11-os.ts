// 11-os.ts
import { EOL } from 'https://deno.land/std@0.170.0/fs/eol.ts';

const osSpecificEOL = EOL[Deno.build.os === 'windows' ? 'CRLF' : 'LF'];
console.log(
  `os: ${Deno.build.os}, os Arch: ${Deno.build.arch} , eol: ${JSON.stringify(osSpecificEOL)}`,
);
console.log(`cpu 个数：${navigator.hardwareConcurrency}`);
console.log(`当前内存总量${Deno.systemMemoryInfo().total / 1024 / 1024} GB`);
console.log(`当前内存余量${Deno.systemMemoryInfo().free / 1024 / 1024} GB`);
console.log(`当前内存可用${Deno.systemMemoryInfo().available / 1024 / 1024} GB`);
Object.entries(Deno.memoryUsage()).forEach(([key, value]) => {
  console.log(`${key}: ${value / 1024 / 1024} MB`);
});
