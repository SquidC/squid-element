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
    <div class="lazy-image2"></div>

    <div class="wrap">
      <h1>测试图片懒加载</h1>
      <h1>测试图片懒加载</h1>
      <h1>测试图片懒加载</h1>
      <h1>测试图片懒加载</h1>
      <h1>测试图片懒加载</h1>
      <div :ref="lazyImage" class="lazy-image"></div>
      <div :ref="lazyImage" class="lazy-image"></div>
      <div :ref="lazyImage" class="lazy-image"></div>
      <div :ref="lazyImage" class="lazy-image"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, unref, watch } from "vue";
import { ElMenu, ElMenuItem, ElSelect,ElOption } from "element-plus";
import { useRouter } from "vue-router";
import ScIcon from "@squid-element/icon";
import ScOperation from "@squid-element/operation";
import { useTranslation } from "@squidc/vue-i18next";
import { useLazyImage } from "@squid-element/hooks";
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
    };


    const lazyImageElm = reactive([]);
    const lazyImage = el => {
      lazyImageElm.push(el);
    };
    useLazyImage(lazyImageElm, [
      "http://localhost:3050/images/ent_slid1.jpg",
      "http://localhost:3050/images/ent_slid2.jpg",
      "http://localhost:3050/images/ent_slid3.jpg",
      "http://localhost:3050/images/ent_slid4.jpg",
    ], "http://localhost:3050/loading.gif");

    return {
      handleSelect,
      activeKey,
      lang,
      switchLanguage,
      t,
      lazyImage,
    };
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
