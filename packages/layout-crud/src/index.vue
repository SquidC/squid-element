<template>
  <div
    class="crud-layout-wrap"
    :class="userConfig.type"
    :style="wrapStyle"
  >
    <div class="header">
      <div class="left-module">
        <Icon
          v-if="userConfig.icon"
          :name="userConfig.icon"
          :color="userConfig.iconColor"
          :size="userConfig.iconSize"
        />
        <span>{{ userConfig.title }}</span>
      </div>
      <div class="right-module">
        <template v-if="userConfig.rawToolsPostion === 'header'">
          <Operation
            :tools="userConfig.tools"
            @tool-click="handleToolClick"
          />
        </template>
      </div>
    </div>
    <div class="body">
      <div
        v-if="userConfig.columns !== undefined && userConfig.columns.length > 0"
        class="table-wrap"
      >
        <template v-if="userConfig.rawToolsPostion === 'body'">
          <div
            v-if="userConfig.tools !== undefined && userConfig.tools.length > 0"
            class="table-tools"
          >
            <Operation
              :tools="userConfig.tools"
              @tool-click="handleToolClick"
            />
          </div>
        </template>
        <div
          ref="tableRef"
          class="table-content"
        >
          <BasicTable
            :columns="userConfig.columns"
            :data-source="dataSource"
            :tools="userConfig.rawTools"
            :height="tableElem.height"
            border
            @tool-click="handleToolClick"
          />
        </div>
        <div class="table-footer">
          <ElPagination
            background
            :layout="userConfig.pageLayout.join(', ')"
            :total="1000"
            @size-change="(value) => handlePage(value, 'pageSize')"
            @current-change="(value) => handlePage(value, 'page')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref } from "vue";
import { props as componentProps, __defaultConfig } from "./props";
import Icon from "@squid-element/icon";
import Operation, { Tool } from "@squid-element/Operation";
import BasicTable from "@squid-element/basic-table";
import { ElPagination } from "element-plus";
import { useElementSize } from "@squid-element/hooks";
import { useDebounce } from "@squid-element/hooks";
import mockData from "./mockData";

/**
 * 增删查改布局组件
 * @author Ming07
 */
export default defineComponent({
  name: "ScCrudLayout",
  components: {
    Icon,
    Operation,
    BasicTable,
    ElPagination,
  },
  props: componentProps,
  setup(props) {
    // 用户配置
    const userConfig = Object.assign(__defaultConfig, props.config!);
    // 请求数据集合
    const dataSource = mockData;
    // 表格样式
    const wrapStyle = computed(() => {
      return {
        padding: userConfig.padding,
      } as CSSProperties;
    });
    // 表格高度
    const tableRef = ref<RefTemplate<HTMLElement>>(null);
    const tableElem = useElementSize(tableRef);

    // 分页
    const handlePage = useDebounce((value, type) => pageEvent(value, type));
    function pageEvent(value: number, type: "pageSize" | "page") {
      userConfig.handleAction(type, value);
    }

    function handleToolClick(tool: Tool, row?: unknown) {
      userConfig.handleAction(tool, row);
    }

    return {
      // data
      props,
      dataSource,
      wrapStyle,
      userConfig,

      // ref
      tableRef,
      tableElem,

      // methods
      handlePage,
      handleToolClick,
    };
  },
});
</script>

<style lang="less" scoped>
.crud-layout-wrap {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  box-sizing: border-box;
  .header {
    padding: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    .left-module {
      display: flex;
      *:nth-child(2) {
        margin-left: 5px;
      }
    }
  }
  .body {
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    background-color: #ffffff;
    .table-wrap {
      flex: 1 1;
      max-width: 100%;
      background-color: #ffffff;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      flex-flow: column nowrap;

      .table-tools {
        font-size: 14px;
        color: #0088ff;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
      }

      .table-content {
        flex: 1 1 10px;
        overflow: hidden;
        box-sizing: border-box;
        margin-bottom: 10px;
      }

      .table-footer {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.space {
  > * {
    margin-bottom: 15px;
  }
  > *:last-child {
    margin-bottom: 0px;
  }
}
</style>
