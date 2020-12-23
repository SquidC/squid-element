<template>
  <div class="doc-header-wrap">
    <div class="logo">
      <img src="./logo.png">
    </div>
    <ElMenu
      class="header-nav-wrap"
      mode="horizontal"
      text-color="#409eff"
      active-text-color="#1989fa"
      :default-active="activeKey"
      router
    >
      <ElMenuItem index="/layout">布局</ElMenuItem>
      <ElMenuItem index="/components">组件</ElMenuItem>
    </ElMenu>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, unref, watch } from "vue"
import { ElMenu, ElMenuItem } from "element-plus"
import { useRouter } from "vue-router"
export default defineComponent({
  name: "DocHeader",
  components: { ElMenu, ElMenuItem },
  setup() {
    const { currentRoute, push } = useRouter()
    const activeKey = ref("/components")
    watch(
      () => unref(currentRoute).path,
      path => {
        const arr = path.split("/")
        activeKey.value = "/" + arr[1]
      },{
        immediate: true,
      },
    )
    function handleSelect(index) {
      push(index)
    }
    return { handleSelect,activeKey }
  },
})
</script>

<style lang="less" scoped>
.doc-header-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  box-sizing: border-box;
  .logo {
    width: 180px;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .header-nav-wrap {
    width: 20vw;
    min-width: 240px;
    border-bottom: 0px;

    :deep(.el-menu-item) {
      font-size: 18px;
      margin: 0px 20px;
    }
    :deep(.is-active) {
      border-bottom: 3px solid rgb(64, 158, 255);
    }
  }
}
</style>
