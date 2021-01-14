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
import { useLocaleT } from "@squid-element/locale";
import { Tool } from "./types";
import { props as componentProps } from "./props";

export default defineComponent({
  name: "Operation",
  components: { ElTooltip, ElPopover, Icon },
  props: componentProps,
  emits: ["tool-click"],
  setup(props, { emit }) {
    const { t } = useLocaleT();
    const tooltips = computed(() => {
      return {
        add: t.value("add","添加"),
        edit: t.value("edit","编辑"),
        view: t.value("view","查看"),
        delete: t.value("delete","删除"),
        more: t.value("more","更多"),
        activate: t.value("activate","激活"),
        forbidden: t.value("forbidden","禁用"),
        refresh: t.value("refresh","刷新"),
        export: t.value("export","导出"),
        search: t.value("search","搜索"),
        compose: t.value("compose","构成"),
        prev: t.value("prev","上一页"),
        next: t.value("next","下一页"),
      };
    });

    const wrapStyle = computed(() => {
      return {
        color: props.color,
        fontSize: props.size,
      } as CSSProperties;
    });

    function handleClick(tool: Tool, row?: unknown) {
      emit("tool-click", tool, row);
    }
    return { ...toRefs(props), tooltips, wrapStyle, handleClick,t };
  },
});
</script>
