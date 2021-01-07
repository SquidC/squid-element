<template>
  <div class="menu-content">
    <span class="menu-content-info">
      <!-- menu name -->
      <span class="menu-name">{{ props.menu.name }}</span>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { MenuContentProps } from "./menu";

export default defineComponent({
  name: "MenuContent",
  components: {
  },
  props: {
    menu: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  setup(props: MenuContentProps){
    return {
      props,
    };
  },

});
</script>

<style lang="less" scoped>
.menu-content-info {
    display: inline-block;
    width: 100%;
    height: 100%;

    .menu-name{
        float: left;
    }

    .menu-tag {
        float: right;
        vertical-align: baseline;
        .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 5px;
        }

        .tag-content{
            display: inline-block;
            font-size: 13px;
            height: 20px;
            line-height: 20px;
            border-radius: 5px;
        }
    }
}
</style>
