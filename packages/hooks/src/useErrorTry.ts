/**
 * 错误重试
*/
/**
 * 无限并发请求，错误重试控制
 * @param fn 发送请求的无参数函数
 * @param max 最大错误次数
 * @param callback 请求完成的回调
 *
*/
export function useErrorTry(reqs: Array<() => Promise<unknown>>, max: number, callback?: (res: any) => void) {
  return new Promise(resolve => {
    const result = [];
    if(reqs.length <= 0) {
      resolve(result);
    }
    function next(req: () => Promise<unknown>, currentMax=max) {
      return req().then(r => {
        callback && callback(r);
        result.push(r);
      }).catch(e => {
        callback && callback(e);
        currentMax--;
        if(currentMax === 0) {
          result.push(e);
        } else {
          next(req, currentMax);
        }
      }).finally(() => {
        if(result.length === reqs.length) {
          resolve(result);
        }
      });
    }

    Promise.all(reqs.map(req => next(req)));
  });
}
