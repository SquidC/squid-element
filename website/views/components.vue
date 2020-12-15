<template>
  <div class="main-wrap">
    组件文档
    <Doc />
    <RouterView class="content" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Doc from "../docs/link.md"

export default defineComponent({
  components: { Doc },
})
</script>
<style lang="less" scoped>
.main-wrap {
  background: rgba(0, 0, 0, .3);
}
</style>
