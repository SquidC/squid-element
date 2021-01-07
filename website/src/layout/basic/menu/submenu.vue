<template>
  <ElSubmenu
    v-if="props.menu.children"
    :key="props.menu.path"
    v-bind="props.elconfig"
    :index="props.menu.path"
    class="submenu-item"
  >
    <template #title>
      <MenuContent :menu="props.menu" />
    </template>
    <ElMenuItemGroup>
      <template #title>
        {{ props.menu.path }}
      </template>
      <SubMenu
        v-for="submenu in props.menu.children"
        :key="submenu.path"
        :menu="submenu"
      />
    </ElMenuItemGroup>
  </ElSubmenu>
  <ElMenuItem
    v-else
    :key="props.menu.path"
    :index="props.menu.path"
  >
    <MenuContent :menu="props.menu" />
  </ElMenuItem>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElSubmenu, ElMenuItem, ElMenuItemGroup } from "element-plus";
import MenuContent from "./content.vue";
import { SubMenuProps } from "./menu";

export default defineComponent({
  name: "SubMenu",
  components: {
    ElSubmenu,
    ElMenuItem,
    ElMenuItemGroup,
    MenuContent,
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
  setup(props: SubMenuProps){
    return {
      props,
    };
  },

});
</script>

<style lang="less" scoped>

</style>
