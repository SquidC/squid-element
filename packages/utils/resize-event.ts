import ResizeObserver from "resize-observer-polyfill";

const isServer = typeof window === "undefined";

export type ResizableElement = CustomizedHTMLElement<{
    __resizeListeners__: Array<(...args: unknown[]) => unknown>;
    __ro__: ResizeObserver;
}>;

/* istanbul ignore next */
const resizeHandler = function (entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const listeners = (entry.target as ResizableElement).__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  }
};

/**
 * 添加元素resize监听
 * @param element 监听元素
 * @param fn 回调函数
 */
export const addResizeListener = function (element: ResizableElement, fn: (...args: unknown[]) => unknown): void {
  if (isServer || !element) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/**
 * 移除元素resize监听
 * @param element 监听元素
 * @param fn 回调函数
 */
export const removeResizeListener = function (element: ResizableElement, fn: (...args: unknown[]) => unknown): void {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};
