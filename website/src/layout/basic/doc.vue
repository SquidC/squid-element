<template>
  <ElMain class="main">
    <ElScrollbar class="doc-scroll">
      <div class="doc-wrap">
        <div class="content-wrap">
          <router-view class="content" />
        </div>
      </div>
    </ElScrollbar>
  </ElMain>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import {
  ElMain,
  ElScrollbar,
} from "element-plus";
export default defineComponent({
  name: "Doc",
  components: {
    ElMain,
    ElScrollbar,
  },
  setup(props) {
    return { props };
  },
});
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}

.doc-wrap {
  width: 100%;
  height: 100%;
  padding: 0 50px 30px;
  box-sizing: border-box;
  overflow: hidden;
  .content-wrap {
    height: 100%;
  }

  .content {
    height: 100%;
    :deep(h3){
        margin: 55px 0 20px;
    }
  }
}

</style>
