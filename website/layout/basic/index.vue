<template>
  <RouterView
    v-slot="{Component}"
  >
    <header>测试layout</header>
    <component
      :is="Component"
      class="main-wrap"
    />
  </RouterView>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "BasicLayout",
  setup() {
    console.log("aas")

    return {

    }
  },
})
</script>
