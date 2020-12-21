<template>
  <RouterView
    v-slot="{Component}"
  >
    <header>测试layout</header>
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
    console.log("aas")

    return {

    }
  },
})
</script>
