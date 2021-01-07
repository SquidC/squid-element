<template>
  <ElMenu
    router
    v-bind="props.elconfig"
    :default-active="currentPath"
  >
    <SubMenu
      v-for="menu in props.menuList"
      :key="menu.path"
      :menu="menu"
    />
  </ElMenu>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { ElMenu } from "element-plus";
import SubMenu from "./submenu.vue";
import { MenuProps } from "./menu";
import { useRoute } from "vue-router";

// default-active
export default defineComponent({
  name: "Menu",
  components: {
    ElMenu,
    SubMenu,
  },
  props: {
    elconfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
    menuList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props: MenuProps) {
    // 获取当前router
    const route = useRoute();
    // 当前路由
    const currentPath = computed(() => route.path);
    return {
      currentPath,
      props,
    };
  },
});
</script>

<style lang="less" scoped>
</style>
