import { brightRed } from "../deps";
export function printError(msg: string) {
    console.log('${brightRed('错误:')} ${msg}');
}