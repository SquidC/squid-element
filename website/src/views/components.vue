<template>
  <div class="main-wrap">
    组件文档
    <RouterView class="content" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

});
</script>
<style lang="less" scoped>
.main-wrap {
  background: rgba(0, 0, 0, .3);
}
</style>
