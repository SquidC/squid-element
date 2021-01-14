<template>
  <div
    class="sc-crud-layout__wrap"
    :class="`sc-crud-layout__${userConfig.type}`"
    :style="wrapStyle"
  >
    <div class="sc-crud-layout__header">
      <div class="sc-crud-layout__left-module">
        <Icon
          v-if="userConfig.icon"
          :name="userConfig.icon"
          :color="userConfig.iconColor"
          :size="userConfig.iconSize"
        />
        <span>{{ userConfig.title }}</span>
      </div>
      <div class="sc-crud-layout__right-module">
        <template v-if="userConfig.rawToolsPostion === 'header'">
          <Operation
            :tools="userConfig.tools"
            @tool-click="handleToolClick"
          />
        </template>
      </div>
    </div>
    <div class="sc-crud-layout__body">
      <div
        v-if="model.tableColumns !== undefined && model.tableColumns.length > 0"
        class="sc-crud-layout__table-wrap"
      >
        <template v-if="userConfig.rawToolsPostion === 'body'">
          <div
            v-if="userConfig.tools !== undefined && userConfig.tools.length > 0"
            class="sc-crud-layout__table-tools"
          >
            <Operation
              :tools="userConfig.tools"
              @tool-click="handleToolClick"
            />
          </div>
        </template>
        <div
          ref="tableRef"
          class="sc-crud-layout__table-content"
        >
          <BasicTable
            :columns="model.tableColumns"
            :data-source="dataSource"
            :tools="userConfig.rawTools"
            :height="tableElem.height"
            border
            @tool-click="handleToolClick"
          />
        </div>
        <div class="sc-crud-layout__table-footer">
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
    <!-- dialog -->
    <ElDialog
      v-if="userConfig.controler === 'dialog'"
      v-model="control.dialogVisible"
      :title="control.title"
      :width="userConfig.controlerWidth"
      :before-close="handleClose"
    >
      <BasicForm
        :model="control.form"
        :form-items="model.formItems"
        :label-width="'50px'"
        @submit="handleSubmit"
      />
    </ElDialog>
    <!-- drawer -->
    <ElDrawer
      v-if="userConfig.controler === 'drawer'"
      v-model="control.dialogVisible"
      :size="userConfig.controlerWidth"
      :title="control.title"
      :before-close="handleClose"
    >
      <BasicForm
        :model="control.form"
        :form-items="model.formItems"
        :label-width="'50px'"
        @submit="handleSubmit"
      />
    </ElDrawer>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, onMounted, reactive, ref } from "vue";
import Icon from "@squid-element/icon";
import Operation, { Tool } from "@squid-element/Operation";
import BasicTable from "@squid-element/basic-table";
import BasicForm from "@squid-element/basic-form";
import { ElPagination, ElDialog, ElDrawer } from "element-plus";
import { useElementSize, useDebounce } from "@squid-element/hooks";
import { props as componentProps, __defaultConfig } from "./props";
import mockData from "./mockData";
import { ActionType } from "./types";
import { useCrudLayoutModel } from "./useModel";

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
    ElDialog,
    ElDrawer,
    BasicForm,
  },
  props: componentProps,
  setup(props) {
    // 用户配置
    const userConfig = Object.assign(__defaultConfig, props.config!);
    // 表单
    const { model, initForm } = useCrudLayoutModel(userConfig.columns as any);
    // 请求数据集合
    const dataSource = mockData;
    // 表格样式
    const wrapStyle = computed(() => {
      return {
        padding: userConfig.padding,
      } as CSSProperties;
    });
    // 控制器 增/改
    const control = reactive({
      dialogVisible: false,
      title: "",
      mode: "",
      form: initForm(),
    });
    // 表格高度
    const tableRef = ref<RefTemplate<HTMLElement>>(null);
    const tableElem = useElementSize(tableRef);
    // 分页
    const handlePage = useDebounce((value, type) => pageEvent(value, type));

    function pageEvent(value: number, type: "pageSize" | "page") {
      userConfig.handleAction(type, value);
    }

    // tool click
    function handleToolClick(tool: Tool, row?: unknown) {
      switch(tool) {
        case "add":
          control.form = initForm();
          control.dialogVisible = true;
          control.title = "add";
          control.mode = "add";
          break;
        case "edit":
          control.form = Object.assign(control.form, row);
          control.dialogVisible = true;
          control.title = "edit";
          control.mode = "add";
          break;
      }
      userConfig.handleAction(tool, row);
    }

    onMounted(() => {
      // TODO 发送获取数据请求
    });

    // basic-form
    function handleSubmit(form, done: () => void) {
      control.form = form;
      // TODO 发送请求
      userConfig.handleAction(control.mode as ActionType, form);
      done();
    }

    function handleClose() {
      control.dialogVisible = false;
      userConfig.handleAction("close", null);
    }

    return {
      // data
      props,
      model,
      dataSource,
      wrapStyle,
      userConfig,
      control,

      // ref
      tableRef,
      tableElem,

      // methods
      handlePage,
      handleSubmit,
      handleToolClick,
      handleClose,
    };
  },
});
</script>
