import * as router from './src/router';
import { printError } from "./src/utils";
import cfg from '../cfg.json' assert {type: 'json'};

async function checkAccess() {
    if (
        (
            await Deno.permissions.query({
                name: 'net',
                host: 'localhost: ${cfg.serverPort}',
            })
        ).state !== 'granted'
    ){
        printError('对localhost：${cfg.serverPort} 没有网络权限');
    }
}

await checkAccess();
router.start();