import { onMounted, onUnmounted } from "vue";
import { useDebounce } from "./useDebounce";

export function useLazyImage(els: HTMLElement[], src: string[], loadingSrc?: string) {
  let lazyImageObserver = null;
  if(!loadingSrc) {
    loadingSrc = "./loading.gif";
  }

  function inViewShow() {
    let len = els.length;
    for(let i = 0; i < len; i++) {
      const imageElement = els[i];
      const rect = imageElement.getBoundingClientRect();
      // 出现在视野的时候加载图片
      if(rect.top < document.documentElement.clientHeight) {
        imageElement.style.background = `background: url('${src[i]}') no-repeat center; background-size: 100%;`;
        // 移除掉已经显示的
        src.splice(i, 1);
        els.splice(i, 1);
        len--;
        i--;
        // if(els.length === 0) {
        //   // 如果全部都加载完 则去掉滚动事件监听
        //   document.removeEventListener("scroll", useDebounce(inViewShow));
        // }
      }
    }
  }

  onMounted(() => {
    els.forEach(lazyImage => {
      lazyImage.setAttribute("style", `background: url('${loadingSrc}') no-repeat center; background-size: 100%;`);
    });
    if ("IntersectionObserver" in window) {
      // 通过IntersectionObserver api判断图片是否出现在可视区域内，不需要监听Scroll来判断
      lazyImageObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, idx) => {
          // 如果元素可见
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.setAttribute("style", `background: url('${src[idx]}') no-repeat center; background-size: 100%;`);
            // 删除加载好的元素
            lazyImageObserver.unobserve(lazyImage);
            src.splice(idx, 1);
          }
        });
      });
      els.forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // TODO
      inViewShow();
      document.addEventListener("scroll", useDebounce(inViewShow));
    }
  });
}
