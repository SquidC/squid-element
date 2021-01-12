/**
 * 函数防抖
 * @param handle
 * @param delay
 */
function debounce<T extends (...args: any[]) => any>(handle: T, delay = 300): T {
  let prevTimer: number | null = null;
  return ((...args: any[]) => {
    if (prevTimer) {
      clearTimeout(prevTimer);
    }
    prevTimer = window.setTimeout(() => {
      handle(...args);
      prevTimer = null;
    }, delay);
  }) as any;
}

/**
 * 函数防抖hook
 * @param handle 回调函数
 * @param delay 延迟毫秒数
 * @returns 返回一个防抖函数
 * @author Ming07
 */
export const useDebounce = <T extends (...args: any[]) => any>(handle: T, delay = 300) => {
  return debounce(handle, delay);
};
