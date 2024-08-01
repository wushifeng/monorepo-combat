import { extension } from 'https://deno.land/std@0.178.0/media_types/extension.ts';
import cfg from '../../../cfg.json' assert { type: 'json' };
import { PORTS_KEY } from '../../consts.ts';
import DB from '../../db.ts';
import type { PortList, Port } from './port-list-types.ts';

export class PortListDB extends DB<PortList> {
  // 存入localStorage的键
  key = PORTS_KEY;

  // 初始化的过程
  init(): void {
    const ports = this.getItems();
    if (!ports) {
      const portsMeta = cfg.portCfg;
      // 简单的类型校验
      if (
        isNaN(portsMeta.end) ||
        isNaN(portsMeta.start) ||
        !Array.isArray(portsMeta.excludes) ||
        portsMeta.excludes.some(isNaN)
      ) {
        throw new Error('portCfg is not valid');
      }
      // 进行发号，排除excludes的端口
      const portList = Array.from(
        { length: portsMeta.end - portsMeta.start + 1 },
        (_v, k) => k + portsMeta.start,
      ).filter((port) => !portsMeta.excludes.includes(port));
      this.setItems(portList);
    }
  }
  // 获取一个可用的端口号
  getPort(): Port {
    const ports = this.get();
    if (ports.length === 0) {
      throw new Error('no available port');
    }
    const port = ports.shift();
    this.set(ports);
    return Number(port);
  }
  // 释放一个端口号
  restorePort(port: Port) {
    const ports = this.get();
    ports.unshift(port);
    this.set(ports);
  }
}
