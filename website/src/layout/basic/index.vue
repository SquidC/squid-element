<template>
  <ElContainer class="doc-layout-wrap">
    <ElHeader class="layout-header-wrap">
      <DocHeader />
    </ElHeader>
    <ElContainer class="page-container">
      <ElAside width="200px">
        <DocSider
          class="component-scroll"
          :menu-list="menu"
          :elconfig="{}"
        />
      </ElAside>
      <Doc class="doc-contanier" />
    </ElContainer>
  </ElContainer>
</template>
<script lang="ts">
import { defineComponent, toRefs, unref, watch, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElHeader, ElAside, ElContainer } from "element-plus";
import DocHeader from "./header.vue";
import DocSider from "./menu/index.vue";
import Doc from "./doc.vue";
// 加载路由表
import componentMenu from "../gen.components";
import layoutMenu from "../gen.layout";

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
  margin: 0 auto;
  max-width: 1200px;
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

    .doc-contanier {
      height: 100%;
      margin: 30px auto;
    }
  }
}

</style>
