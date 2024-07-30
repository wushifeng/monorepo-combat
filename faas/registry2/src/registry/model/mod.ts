//对于有进入点mod.ts文件的文件夹，外部如果需要其中的函数或者变量，都必须通过进入点，这样在一个项目变得复杂以后，依赖问题可以通过分析进入点文件之间的关系来解决。一个文件夹使用进入点mod.ts文件管理的本质是这个文件夹是一个匿名包。

import{ PortListDB } from"./port-list.ts";
import { RegistryDictDB } from'./registry-dict.ts'

export const portListDB = new PortListDB();
export const registryDictDB = new RegistryDictDB ()

//初始化
function init(){
    portListDB.init();
    registryDictDB.init();
}

init ();

//获取所有状态
export function getAll(){
    return {
        registry: registryDictDB.get(),
        ports: portListDB.get(),
    }
}
