<template>
  <div class="test1">
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
  setup(props) {
    // init here
    console.log(props)
  },
})
</script>
