import { dirname, join } from './deps.ts';
const __dirname = dirname(new URL(import.meta.url).pathname);

function getPath(name: string):string {
    const urlPathname = join(__dirname, name);
    return Deno.build.os === "windows" ? urlPathname.slice(1) : urlPathname;
}

export const baseStoreDir =getPath('store');
export const logDir = getPath('log');

export const timerStoreDir = 'timer';
