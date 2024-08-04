import { serve } from './deps.ts';
import { handlerMaker } from './src/req-handler.ts';
import { register } from 'http://localhost:8000/register@0.1.0/mod.ts';
import { boot } from './src/boot.ts';
const path = '/v1/timer/register';

const filePath = new URL(import.meta.url).pathname;
await boot();

const port = await register([path], filePath);
serve(handlerMaker('POST', path), { port });

console.log(`http://localhost:${port}${path}`);
console.log(`http://localhost:8000${path}`);
