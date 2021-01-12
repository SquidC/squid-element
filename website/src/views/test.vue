<template>
  <div class="test">
    <ElMenu
      class="header-nav-wrap"
      mode="horizontal"
      text-color="#409eff"
      active-text-color="#1989fa"
      router
    >
      <ElMenuItem index="/layout-crud">crud layout</ElMenuItem>
    </ElMenu>
    <div v-draggable class="test-draggable"></div>
    <ScIcon name="add" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watch } from "vue";
import { ElMenu, ElMenuItem } from "element-plus";
import { useRouter } from "vue-router";
import ScIcon from "@squid-element/icon";
export default defineComponent({
  components: {
    ScIcon,
    ElMenu,
    ElMenuItem,
  },
  setup() {
    const { currentRoute, push } = useRouter();
    const activeKey = ref("/components");
    watch(
      () => unref(currentRoute).path,
      path => {
        const arr = path.split("/");
        activeKey.value = "/" + arr[1];
      },{
        immediate: true,
      },
    );
    function handleSelect(index) {
      push(index);
    }
    return { handleSelect,activeKey };
  },
});
</script>

<style lang="less" scoped>
.test-draggable {
  width: 100px;
  height: 100px;
  background: red;
}

</style>
