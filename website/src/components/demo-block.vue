<template>
  <div
    class="demo-block"
    :class="[{ hover: hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- 代码生成的ui -->
    <div class="source">
      <slot name="source"></slot>
    </div>
    <!-- 源码区 -->
    <div
      ref="meta"
      class="meta"
    >
      <div
        v-if="$slots.default"
        ref="description"
        class="description"
      >
        <slot></slot>
      </div>
      <div
        ref="highlight"
        class="highlight"
      >
        <slot name="highlight"></slot>
      </div>
    </div>
    <!-- demo块控制区 -->
    <div
      ref="control"
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded"
    >
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>


<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  ref,
  watchEffect,
  onMounted,
  nextTick,
} from "vue";
import hljs from "highlight.js";
import { useRefTemplate } from "@squid-element/hooks";
export default defineComponent({
  name: "DemoBlock",
  setup() {
    const meta = ref(null);
    const description = ref(null);
    const highlight = ref(null);
    const state = reactive({
      /**
       * 是否悬浮
       */
      hovering: false,
      /**
       * 控制器是否展开
       */
      isExpanded: false,
      fixedControl: false,
      isMounted: false,
    });
    /**
     * 控制器文本
     */
    const controlText = computed(() => {
      return state.isExpanded ? "隐藏代码" : "显示代码";
    });
    const codeAreaHeight = computed(() => {
      if (state.isMounted && state.isExpanded) {
        const descEl = useRefTemplate<HTMLElement>(description, true);
        const hlEl = useRefTemplate<HTMLElement>(highlight);
        const height =
          (descEl ? descEl.clientHeight + 20 : 0) + hlEl.clientHeight + 20;
        return height + "px";
      } else {
        return "1px";
      }
    });
    onMounted(() => {
      state.isMounted = true;
      nextTick(() => {
        try {
          const hlEl = useRefTemplate<HTMLElement>(highlight) as HTMLElement;
          const code = hlEl.querySelector("code") as HTMLElement;
          hljs.highlightBlock(code);
        } catch (error) {
          console.log(error);
        }
      });
    });
    watchEffect(() => {
      if (state.isMounted) {
        if (state.isExpanded) {
          const el = useRefTemplate<HTMLElement>(meta);
          el.style.height = codeAreaHeight.value;
        } else {
          const el = useRefTemplate<HTMLElement>(meta);
          el.style.height = "1px";
        }
      }
    });
    return { ...toRefs(state), controlText, meta, description, highlight };
  },
});
</script>

<style lang="less" scoped>
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    :deep(pre) {
      margin: 0;
      .html {
        padding: 18px;
      }
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 868px;
    }

    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
</style>
