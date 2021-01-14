<template>
  <div
    class="operation-wrap"
    :style="wrapStyle"
  >
    <template
      v-for="(tool, index) in tools"
      :key="tool + index"
    >
      <ElTooltip
        :placement="placement"
        :content="tooltips[tool]"
      >
        <Icon
          :name="tool"
          @click="handleClick(tool, row)"
        />
      </ElTooltip>
    </template>
    <template v-if="extras.length > 0">
      <ElPopover :trigger="trigger">
        <div
          class="rw-operation-wrap"
          :style="wrapStyle"
        >
          <template
            v-for="(tool, index) in extras"
            :key="tool + index"
          >
            <ElTooltip
              :placement="placement"
              :content="tooltips[tool]"
            >
              <Icon
                :name="tool"
                @click="handleClick(tool, row)"
              />
            </ElTooltip>
          </template>
        </div>
        <template #reference>
          <Icon name="more" />
        </template>
      </ElPopover>
    </template>
  </div>
</template>


<script lang="ts">
import { computed, CSSProperties, defineComponent, toRefs } from "vue";
import { ElTooltip, ElPopover } from "element-plus";
import Icon from "@squid-element/icon";
import { useTranslation } from "@squid-element/locale";
import { Tool } from "./types";
import { props as componentProps } from "./props";

export default defineComponent({
  name: "Operation",
  components: { ElTooltip, ElPopover, Icon },
  props: componentProps,
  emits: ["tool-click"],
  setup(props, { emit }) {
    const { t } = useTranslation();
    const tooltips: { [key in Tool]: string } = {
      add: t("add","添加"),
      edit: t("edit","编辑"),
      view: t("view","查看"),
      delete: t("delete","删除"),
      more: t("more","更多"),
      activate: t("activate","激活"),
      forbidden: t("forbidden","禁用"),
      refresh: t("refresh","刷新"),
      export: t("export","导出"),
      search: t("search","搜索"),
      compose: t("compose","构成"),
      prev: t("prev","上一页"),
      next: t("next","下一页"),
    };
    const wrapStyle = computed(() => {
      return {
        color: props.color,
        fontSize: props.size,
      } as CSSProperties;
    });
    function handleClick(tool: Tool, row?: unknown) {
      emit("tool-click", tool, row);
    }
    return { ...toRefs(props), tooltips, wrapStyle, handleClick };
  },
});
</script>
