<template>
  <ElTable v-bind="props" :data="dataSource">
    <template v-for="column in columns" :key="column.field">
      <ElTableColumn v-bind="column" :prop="column.field">
        <template v-if="column.render" #default="scope">
          <TableColumn :col="scope.row[column.field]" :row="scope.row" :render="column.render" />
        </template>
      </ElTableColumn>
    </template>
    <template v-if="tools.length > 0">
      <ElTableColumn label="操作栏">
        <template #default="scope">
          <Operation
            :tools="tools"
            :extras="extras"
            :row="scope.row"
            @tool-click="handleClick"
          />
        </template>
      </ElTableColumn>
    </template>
  </ElTable>
</template>


<script lang="ts">
import { defineComponent, toRefs } from "vue"
import { props as componentProps } from "./props"
import { ElTable, ElTableColumn } from "element-plus"
import Operation, { Tool } from "@squid-element/operation"
import TableColumn from "./TableColumn"
export default defineComponent({
  name: "BasicTable",
  components: { ElTable, ElTableColumn, TableColumn, Operation },
  props: componentProps,
  emits: ["tool-click"],
  setup(props,{ emit }) {
    /**
         * 操作栏点击事件
         */
    function handleClick(tool: Tool,row: unknown) {
      emit("tool-click",tool,row)
    }
    return { props, ...toRefs(props), handleClick }
  },
})
</script>
