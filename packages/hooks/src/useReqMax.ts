/**
 * 并发请求控制
 * @param fn 发送请求的无参数函数
 * @param max 最大并发数
 * @param callback 请求完成的回调
 *
*/
export function useReqMax(reqs: Array<() => Promise<unknown>>, max: number, callback?: (res: any) => void) {
  return new Promise(resolve => {
    let idx = 0;
    const result = [];
    if(reqs.length <= 0) {
      resolve(result);
    }
    function next() {
      reqs[idx++]().then(r => {
        result.push(r);
      }).catch(e => {
        result.push(e);
      }).finally(() => {
        callback && callback(result[result.length - 1]);
        if(reqs.length === result.length) { // 避免idx++正在运行 结果未返回
          resolve(result);
        } else if(idx < reqs.length) {
          next();
        }
      });
    }
    Array(max).fill(1).forEach(() => next());
  });
}
