import { reactive, Ref, onMounted, onBeforeUnmount } from "vue";
import { useElementResize } from "./useElementResize";
import { useRefTemplate } from "./useRefTemplate";

/**
 * 使用元素size hook
 * @param elementRef 元素ref
 */
export function useElementSize(elementRef: Ref<RefTemplate<HTMLElement>>) {
  const elem = reactive({
    width: 0,
    height: 0,
  });
  let stopElResizeFn: Fn = () => {
    return;
  };
  /**
     * 开始监听
     */
  function start() {
    const el = useRefTemplate(elementRef);
    const handle = () => {
      (elem.width = el.offsetWidth), (elem.height = el.offsetHeight);
    };
    const [addResize, removeResize] = useElementResize(el, handle);
    stopElResizeFn = removeResize;
    addResize();
  }
  /**
     * 停止监听
     */
  function stop() {
    stopElResizeFn && stopElResizeFn();
  }

  onMounted(() => {
    start();
  });

  onBeforeUnmount(() => {
    stop();
  });

  return elem;
}
