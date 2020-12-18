<template>
  <RouterView
    v-slot="{Component}"
  >
    <header>测试layout</header>
    <h1>markdown</h1>
    <Link />
    <h1>component</h1>
    <SCIcon />
    <Test1 />
    <component
      :is="Component"
      class="main-wrap"
    />
  </RouterView>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import Link from "../../docs/link.md"
import { SCIcon, Test1 } from "squid-element"

export default defineComponent({
  name: "BasicLayout",
  components: {
    Link,
    SCIcon,
    Test1,
  },
  setup() {
    console.log("aas")

    return {

    }
  },
})
</script>
