import { addResizeListener, removeResizeListener, ResizableElement } from "@squid-element/utils/resize-event";
import { useDebounce } from "./useDebounce";

/**
 * Element Resize 事件hook
 * @author Ming07
 */
export function useElementResize(element: HTMLElement | typeof window, handle, delay = 300) {
  const originHandle = () => {
    handle();
  };
    /**
     * 防抖回调函数
     */
  const debounceHandle = useDebounce(originHandle, delay);
  /**
     * 添加监听element的resize事件
     */
  function addResize() {
    addResizeListener(element as ResizableElement, debounceHandle);
  }
  /**
     * 移除监听element的resize事件
     */
  function removeResize() {
    removeResizeListener(element as ResizableElement, debounceHandle);
  }
  return [addResize, removeResize];
}
