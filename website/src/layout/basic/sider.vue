<template>
  <ElMenu
    class="doc-sider-wrap"
    active-text-color="#1989fa"
    :default-active="activeKey"
    router
  >
    <template v-for="menuItem in props.menu" v-key="menuItem.path">
      <ElMenuItem :index="menuItem.path">{{ menuItem.name }}</ElMenuItem>
    </template>
  </ElMenu>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ElMenu, ElMenuItem } from "element-plus";

export interface MenuItem {
  name: string
  path: string
}

export default defineComponent({
  name: "DocSider",
  components: { ElMenu, ElMenuItem },
  props: {
    menu: {
      type: Array as PropType<MenuItem[]>,
      default: () => {
        return [];
      },
    },
    activeKey: {
      type: String as PropType<string>,
    },
  },
  setup(props) {
    return { props };
  },
});
</script>

<style lang="less" scoped>
.doc-sider-wrap {
  width: 100%;
  height: 100%;
}
</style>
