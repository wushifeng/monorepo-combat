import DB from '../../db.ts';
import { REGISTRY_DB_KEY } from '../../consts.ts';
import { intersect } from '../../../deps.ts';
import { PathCache, RegistryDict, Registry } from './registry-dict-types.ts';

export class RegistryDictDB extends DB<RegistryDict> {
  // 存储pathCache，对一个具体的path请求时可以快速获得路径
  private pathCache: PathCache = {};
  // 在获取registry时不需要每次都访问localStorage，可以直接从缓存中获取，提升速度
  private RegistryCache: RegistryDict = {};
  key = REGISTRY_DB_KEY;

  public init(): void {
    const registryDictLocalStorage = this.getItems();
    console.log('registryDictLocalStorage', registryDictLocalStorage);

    if (!registryDictLocalStorage) {
      console.log('registryDictLocalStorage 不存在，开始初始化...');
      this.setItems({});
    }
    const RegistryDict = super.get();
    this.setAndRefreshCache(RegistryDict);
  }

  public deleteFilePath(filePath: string) {
    const RegistryDict = this.get();
    const port = RegistryDict[filePath].port;
    delete RegistryDict[filePath];
    this.setAndRefreshCache(RegistryDict);
    return port;
  }

  public ifFilePathExist(filePath: string) {
    const registryDict = this.get();
    return Object.keys(registryDict).includes(filePath);
  }

  public getTargetUrl(path: string): string | undefined {
    return this.pathCache[path]?.targetUrl;
  }

  public setAndRefreshCache(data: RegistryDict): void {
    // 刷新 cache
    this.RegistryCache = data;
    // 刷新pathcache
    Object.values(this.RegistryCache).forEach((registry) => {
      registry.path.forEach((path) => {
        this.pathCache[path] = registry;
      });
    });

    // 更新数据库
    this.set(data);
  }
  override get(): RegistryDict {
    return this.RegistryCache;
  }

  private checkUniquePath(filePath: string, path: string[]) {
    const registryDict = this.get();
    Object.keys(registryDict)
      .filter((x) => x !== filePath)
      .forEach((key) => {
        // 一个地址的Path不能和其他地址的Path有交集
        const intersectPath = intersect(registryDict[key].path, path);
        if (intersectPath.length > 0) {
          throw new Deno.errors.AlreadyExists(`路径${intersectPath.join(',')}已经被注册`);
        }
      });
  }

  refreshPath(filePath: string, path: string[]) {
    this.checkUniquePath(filePath, path);
    const registryDict = this.get();

    // 没有地址冲突，更新地址的Path
    registryDict[filePath].path = path;
    this.setAndRefreshCache(registryDict);
  }
  setRegistry(registry: Registry) {
    this.checkUniquePath(registry.filePath, registry.path);
    // 没有地址冲突，更新地址
    const registryDict = this.get();
    registryDict[registry.filePath] = registry;
    this.setAndRefreshCache(registryDict);
  }
}
