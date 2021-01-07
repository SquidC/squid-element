<template>
  <div class="test">
    <div v-draggable class="test-draggable"></div>
    <ScIcon name="add" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ScIcon from "@squid-element/icon";
export default defineComponent({
  components: {
    ScIcon,
  },
});
</script>

<style lang="less" scoped>
.test-draggable {
  width: 100px;
  height: 100px;
  background: red;
}

</style>
