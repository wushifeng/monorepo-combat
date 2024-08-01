let httpRequests = 0;
addEventListener('httpRequestEvent', () => console.log('httpRequestEvent 被调用', ++httpRequests));
export function someFunc() {
  console.log('someFunc 被调用');
}
