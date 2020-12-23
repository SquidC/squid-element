import { PropType } from "vue";
import { Tool } from "@squid-element/operation";
import { TableColumn } from "./types";
export const props = {
  /**
     * 表格数据源
     */
  dataSource: {
    type: Array,
    default: () => {
      return [];
    },
  },
  /**
     * 表格列配置项集合
     */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => {
      return [];
    },
  },
  /**
     * 表格高度
     */
  height: {
    type: [String, Number],
  },
  /**
     * 功能列表
     */
  tools: {
    type: Array as PropType<Tool[]>,
    default: () => {
      return [];
    },
  },
  /**
     * 额外功能列表
     * @description 藏在更多按钮里面
     */
  extras: {
    type: Array as PropType<Tool[]>,
    default: () => {
      return [];
    },
  },
};

export const TableColumnProps = {
  render: {
    type: Function as PropType<(col: unknown, row: unknown) => JSX.Element>,
  },
  col: {
    type: [String, Number, Object, Array, Boolean] as PropType<unknown>,
  },
  row: {
    type: Object,
  },
};
