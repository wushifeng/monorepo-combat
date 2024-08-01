import { registryDictDB } from '../../registry/model/mod.ts';
export function getTargetUrl(pathname: string) {
  const targetUrl = registryDictDB.getTargetUrl(pathname);
  if (!targetUrl) {
    throw new Deno.errors.NotFound();
  }
  return `${targetUrl}${pathname}`;
}
