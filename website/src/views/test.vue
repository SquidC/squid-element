<template>
  <div class="test">
    <h1>
      {{ t("hello") }}
    </h1>
    <ElMenu
      class="header-nav-wrap"
      mode="horizontal"
      text-color="#409eff"
      active-text-color="#1989fa"
      router
    >
      <ElMenuItem index="/layout-crud">crud layout</ElMenuItem>
    </ElMenu>
    <!-- <div v-draggable class="test-draggable"></div> -->
    <ScIcon name="add" />
    <sc-operation :tools="['add']" />
    <ElSelect
      v-model="lang"
      @change="switchLanguage"
    >
      <ElOption
        label="zh"
        value="zh"
      />
      <ElOption
        label="en"
        value="en"
      />
      <ElOption
        label="jp"
        value="jp"
      />
    </ElSelect>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref, watch } from "vue";
import { ElMenu, ElMenuItem, ElSelect,ElOption } from "element-plus";
import { useRouter } from "vue-router";
import ScIcon from "@squid-element/icon";
import ScOperation from "@squid-element/operation";
import { useTranslation } from "@squidc/vue-i18next";
export default defineComponent({
  components: {
    ScIcon,
    ElMenu,
    ElMenuItem,
    ElSelect,
    ScOperation,
    ElOption,
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
    const { t, i18n } = useTranslation();
    const lang = ref("zh");
    const switchLanguage = (value: string) => {
      i18n.loadLanguages(value).then(res => {
        console.log("res:",res);
        i18n.changeLanguage(value).then(t => {
          console.log("change lang回调");
          console.log("当前翻译:", t("hello"));

        });
      }).catch(err => {
        console.log("err:",err);
      });
      // i18n.changeLanguage(value)
      // location.reload()
    };
    return { handleSelect,activeKey, lang, switchLanguage,t };
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
