import { onMounted, ref } from "vue";
import { useDebounce } from "./useDebounce";

// 监听到滚动加载数据，数据变化驱动视图改变
export function useScrollLoading(
  wrap: {value: HTMLElement},
  data: Array<unknown>,
  requester: (...args: any[]) => Promise<unknown>,
  format: (response: unknown) => any = r => r,
) {
  const loadding = ref(false);
  // 添加监听事件
  onMounted(() => {
    wrap.value.addEventListener("scroll", useDebounce(() => {
      const el = wrap.value;
      const pageHeight = el.scrollHeight; // 页面总高度
      const scrollTop = el.scrollTop; // 滚动条距离最上面
      const clientHeight = el.clientHeight; // 元素高度
      // 提早加载
      if (pageHeight - clientHeight - scrollTop < 100) {
        next();
      }
    }));
  });


  function next() {
    loadding.value = true;
    requester().then(rep => {
      rep = format(rep);
      data.push(...rep);
      loadding.value = false;
    });
  }

  next();

  return loadding;
}
