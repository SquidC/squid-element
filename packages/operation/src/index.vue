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
import { computed, CSSProperties, defineComponent, toRefs } from "vue"
import { ElTooltip, ElPopover } from "element-plus"
import Icon from "@squid-element/icon"
import { Tool } from "./types"
import { props as componentProps } from "./props"

export default defineComponent({
  name: "Operation",
  components: { ElTooltip, ElPopover, Icon },
  props: componentProps,
  emits: ["tool-click"],
  setup(props, { emit }) {
    const tooltips: { [key in Tool]: string } = {
      add: "添加",
      edit: "编辑",
      view: "查看",
      delete: "删除",
      more: "更多",
      activate: "激活",
      forbidden: "禁用",
      refresh: "刷新",
      export: "导出",
      search: "搜索",
      compose: "构成",
      prev: "上一页",
      next: "下一页",
    }
    const wrapStyle = computed(() => {
      return {
        color: props.color,
        fontSize: props.size,
      } as CSSProperties
    })
    function handleClick(tool: Tool, row?: unknown) {
      emit("tool-click", tool, row)
    }
    return { ...toRefs(props), tooltips, wrapStyle, handleClick }
  },
})
</script>
