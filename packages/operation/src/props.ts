import { Placement, TriggerType } from "element-plus/lib/el-popper/src/use-popper";
import { PropType } from "vue";
import { Tool } from "./types";
export const props = {
  /**
     * 表格行数据
     */
  row: {
    type: Object,
  },
  /**
     * 图标颜色
     */
  color: {
    type: String,
  },
  /**
     * 图标大小
     */
  size: {
    type: [String, Number],
  },
  /**
     * 操作项提示出现位置
     */
  placement: {
    type: String as PropType<Placement>,
    default: "top",
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
     * 触发显示额外功能列表方式
     */
  trigger: {
    type: String as PropType<TriggerType>,
    default: "hover",
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
  /**
     * 自定义内容
     */
  content: {
    type: Object as PropType<JSX.Element>,
  },
};
