import * as router from './src/router.ts';
import { printError } from "./src/utils.ts";
import cfg from './cfg.json' with {type: 'json'};

console.log(`cfg: ${cfg.serverPort}`);

async function checkAccess() {
    if (
        (
            await Deno.permissions.query({
                name: 'net',
                host: `localhost:${cfg.serverPort}`,
            })
        ).state !== 'granted'
    ){
        printError(`对localhost: ${cfg.serverPort} 没有网络权限`);
    }
}

await checkAccess();
router.start();
