<template>
  <RouterView
    v-slot="{Component}"
  >
    <div class="test-wrap"> test-wrap </div>
    <h1>markdown</h1>
    <Link />
    <h1>component</h1>
    <BasicForm
     />
    <component
      :is="Component"
      class="main-wrap"
    />
  </RouterView>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { BasicForm } from "squid-element"
import Link from "/@/docs/link.md"

export default defineComponent({
  name: "BasicLayout",
  components: {
    Link,
    BasicForm,
  },
  setup() {
    return {

    }
  },
})
</script>
