
function throttle<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
  let prev = Date.now();
  return function(...args: unknown[]) {
    const now = Date.now();
    if (now - prev >= delay) {
      fn.apply(this, args);
      prev = now;
    }
  };
}


/**
 * 函数节流hook
 * @param handle 回调函数
 * @param delay 延迟毫秒数
 * @returns 返回一个防抖函数
 */
export const useThrottle = <T extends (...args: any[]) => any>(handle: T, delay = 300) => {
  return throttle(handle, delay);
};
