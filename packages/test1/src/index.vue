<template>
  <div class="test1">
    <h1>test1</h1>
    <ElButton type="primary">aaa</ElButton>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { ElButton } from "element-plus"

export default defineComponent({
  name: "SCTest1",
  components: {
    ElButton,
  },
  props: { },
  setup() {
    // init here
    console.log("load test1")
    return {

    }
  },
})
</script>
