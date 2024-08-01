import { config as loadEnv } from 'https://deno.land/std@0.170.0/dotenv/mod.ts';
const configData = await loadEnv({
  export: true,
  allowEmptyValues: true,
  safe: true,
});
console.log('环境变量的内容', configData);
console.log(`MY_CONFIG=${Deno.env.get('MY_CONFIG')}`);
console.log(`EMPTY_CONFIG=${Deno.env.get('EMPTY_CONFIG')}`);
console.log(`HOSTNAME=${Deno.env.get('HOSTNAME')}`);
