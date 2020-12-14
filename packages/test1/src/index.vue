<template>
  <div class="test1">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "SCTest1",
  props: { },
  setup(props) {
    // init here
  },
})
</script>
