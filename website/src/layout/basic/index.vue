<template>
  <ElContainer class="doc-layout-wrap">
    <ElHeader class="layout-header-wrap">
      <DocHeader />
    </ElHeader>
    <ElContainer class="page-container">
      <ElAside width="240px">
        <DocSider :menu="menu" :active-key="siderKey" />
      </ElAside>
      <Doc />
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, toRefs, unref, watch, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElHeader, ElAside, ElContainer } from "element-plus";
import DocHeader from "./header.vue";
import DocSider from "./sider.vue";
import Doc from "./doc.vue";
import componentMenu from "../component.menu";
import layoutMenu from "../layout.menu";

export default defineComponent({
  name: "BasicLayout",
  components: {
    ElHeader,
    ElAside,
    ElContainer,
    DocHeader,
    DocSider,
    Doc,
  },
  setup() {
    const { currentRoute } = useRouter();
    const state = reactive({
      headerKey: "",
      siderKey: "",
      menu: [],
    });
    watch(
      () => unref(currentRoute).path,
      path => {
        const arr = path.split("/");
        state.headerKey = "/" + arr[1];
        state.siderKey = arr[2];
      },
      {
        immediate: true,
      },
    );
    watchEffect(() => {
      if (state.headerKey === "/components") {
        state.menu = componentMenu;
      }else {
        state.menu = layoutMenu;
      }
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="less" scoped>
.doc-layout-wrap {
  width: 100%;
  height: 100%;
  .layout-header-wrap {
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }
  .page-container {
    padding-top: 0px;
    overflow: hidden;
    .component-scroll {
      height: 100%;
    }
  }
}
</style>
