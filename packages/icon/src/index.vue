<template>
  <div
    class="icon-wrap"
    :style="wrapStyle"
    @click="handleClick(name)"
  >
    <IconFont :type="'icon-' + name" />
  </div>
</template>


<script lang="ts">
import { computed, CSSProperties, defineComponent, toRefs } from "vue";
import { props as componentProps } from "./props";
import { createFromIconfontCN } from "@ant-design/icons-vue";

const IconFont: any = createFromIconfontCN({
  // 在 iconfont.cn 上生成
  // TODO: cdn后续在取得项目配置中获取
  scriptUrl: "//at.alicdn.com/t/font_1701693_9q17ffjqa8k.js",
});
export default defineComponent({
  name: "ScIcon",
  components: { IconFont },
  props: componentProps,
  emits: ["click"],
  setup(props, { emit }) {
    // 根据属性生成组件样式
    const wrapStyle = computed(() => {
      return {
        color: props.color,
        fontSize: props.size,
      } as CSSProperties;
    });
    function handleClick(icon?: string) {
      emit("click", icon);
    }
    return {
      ...toRefs(props),
      wrapStyle,
      handleClick,
    };
  },
});
</script>
