<template>
  <div class="icon-test">
    icon components
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue"
export default defineComponent({
  name: "SCIcon",
  props: { },
  setup(props) {
    // init here
  },
})
</script>
