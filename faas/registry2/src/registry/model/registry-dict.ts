
//faas/registry/src/registry/model/registry-dict.ts
import DB from'../../db.ts';
import{ REGISTRY_DB_KEY } from '../../consts.ts';
import type { RegistryDict, PathCache, Registry } from'./registry-dict-types.ts';
import{ intersect } from '../../../deps.ts';

export class RegistryDictDB extends DB<RegistryDict>{
    //存储 pathcache,对一个具体的path 请求时可以快速获得路径
    private pathCache: PathCache ={};

    //在获取registry时不需要每次都访问localstorage,可以直接从缓存获取,提升速度
    private RegistryCache:RegistryDict = {};
    key = REGISTRY_DB_KEY;

    public init(){
        const registryDictLocalStorage = this.getItems();
        console.log('registryDietLocalstorage', registryDictLocalStorage);
        if(!registryDictLocalStorage){
            console.log('registryDictLocalstorage不存在,开始初始化...');
            this.setItems({})
        };
        const registryDict = super.get();
        this.setAndRefreshCache(registryDict);
    }

    private setAndRefreshCache(data: RegistryDict): void {
        //刷新 cache
        this.RegistryCache = data;
        //刷新 pathCache
        Object.values(this.RegistryCache).forEach((registry)=>{
            registry.path.forEach((path) => {
                this.pathCache[path] = registry;
            });
        });
        //更新数据库
        this.set(data);
    }

    public deleteFilePath(filePath: string){
        const registryDict = this.get();
        const port = registryDict[filePath].port;
        delete registryDict[filePath];
        this.setAndRefreshCache(registryDict);
        return port;
    }

    public getTargetUrl(path: string): string|undefined{
        return this.pathCache[path]?.targetUrl;
    }

    public ifFilePathExist(filePath: string){
        const registryDict = this.get();
        return Object.keys(registryDict).includes(filePath);
    }

    override get(): RegistryDict {
        return this.RegistryCache;
    }
  
    private checkUniquePath(filePath:string, path:string[]){
        const registryDict = this.get();
        Object.keys(registryDict)
        .filter((x)=> x !== filePath)
        .forEach((key) => {
            //一个地址的Path不能和其他地址的Path 冇交集
            const intersectPath = intersect(registryDict[key].path, path);
            if(intersectPath.length>0){
                throw new Deno.errors.AlreadyExists(`路径${intersectPath.join(',')}已经被注册`);
            }
        });
    }

    //第一次注册地址
    setRegistry(registry:Registry) {
        this.checkUniquePath(registry.filePath, registry.path);
        //没有地址冲突,更新地址
        const registryDict = this.get();
        registryDict[registry.filePath]=registry;
        this.setAndRefreshCache(registryDict)
    }

    //非第一次注册地址,更新地址
    refreshPath(filePath:string,path:string[]){
        this.checkUniquePath(filePath,path);
        const registryDict=this.get();
        
        //没有地址冲,更新地址的Path
        registryDict[filePath].path = path;
        this.setAndRefreshCache(registryDict);
    }
}