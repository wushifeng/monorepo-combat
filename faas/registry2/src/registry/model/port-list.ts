import cfg from "../../../cfg.json" with { type:'json' };
import { PORTS_KEY } from '../../consts.ts';
import DB from'../../db.ts';
import type { PortList, Port } from './port-list-types.ts';

export class PortListDB extends DB<PortList>{
    //存 localStorage 的键
    key = PORTS_KEY;

    init(){
        const ports = this.getItems();
        if(!ports){
            const portsMeta = cfg.portCfg;
            //简单的类型校验
            if(
            isNaN(portsMeta.end)||
            isNaN(portsMeta.start)||
            !Array.isArray(portsMeta.excludes)||
            portsMeta.excludes.some(isNaN)){
            throw new Error ('portCfg is not valid');
            }
            
            //发放端口号,排除excludes的端口
            const portList = Array.from(
                { length: portsMeta.end - portsMeta.start + 1 },
                (_v,k) => k + portsMeta.start,
            ).filter((port) => !portsMeta.excludes.includes(port));

            //初始化可以发放的端口号
            this.setItems(portList);
        }
    }

    //获取一个可用的端口号
    getPort(): Port {
        const ports = this.get();
        if(ports.length === 0){
            throw new Error('no available port ');
        }
        
        const port = ports.shift();
        this.set(ports);
        return Number(port);
    }

    //释放一个端口号
    restorePort(port:Port){
        const ports = this.get();
        ports.unshift(port);
        this.set(ports);
    }
}