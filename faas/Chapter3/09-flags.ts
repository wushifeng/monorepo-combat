import { parse } from 'https://deno.land/std@0.170.0/flags/mod.ts';
const args = parse(Deno.args, {
  alias: {
    help: 'h',
    version: 'v',
    port: 'p',
    timeout: 't',
    name: 'n',
  },
  boolean: ['help', 'version'],
  string: ['name', 'port', 'timeout'],
  collect: ['task'],
  default: {
    name: 'my-web-app-01',
    help: false,
    port: '8080',
    timeout: '1000',
  },
});

console.log(args);
