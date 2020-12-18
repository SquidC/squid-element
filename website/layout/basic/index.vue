<template>
  <RouterView
    v-slot="{Component}"
  >
    <header>测试layout</header>
    <Link />
    <component
      :is="Component"
      class="main-wrap"
    />
  </RouterView>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Link from "../../docs/link.md"

export default defineComponent({
  name: "BasicLayout",
  components: {
    Link,
  },
  setup() {
    console.log("aas")

    return {

    }
  },
})
</script>
