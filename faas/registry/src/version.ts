import pkg from '../package.json' assert {type: 'json'};
const startTime = Date.now();

export function version() {

    return {
        version: pkg.version,
        uptime: (Date.now() - startTime) / 1000,
        ...Deno.version
        ...Deno.memoryUsage(),
    }
}