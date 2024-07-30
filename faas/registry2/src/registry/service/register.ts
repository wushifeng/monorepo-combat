interface RegisterOptions{
    //注册的路径,每个路径只能注册一次
    path: string[];
    filePath: string;
}

import { registryDictDB, portListDB } from '../model/mod.ts';
export function register({ path, filePath}:RegisterOptions) {
    //获取当前的注册表信息
    const registryDict = registryDictDB.get();
    //使用文件路径作为key,用于获取注册信息
    const res = registryDict[filePath];
    if(res){
        //若已经注册了,调用刷新地址方法,将path 更新
        registryDictDB.refreshPath(filePath,path);
        //如果文件路径相同,直接返回端口号
        return res.port;
    }
    
    //第一次注册
    //获一个端口号
    const port = portListDB.getPort();
    //创建 targetUrl
    const targetUrl = `http://localhost:${port}`;
    //第一次注册的方法
    registryDictDB.setRegistry({
        filePath,
        path,
        port,
        targetUrl,
    });
    //返回端口号
    return port;
}
