import { PropType } from "vue";

/**
 * icon组件属性
 */
export const props = {
  /**
     * 图标名称
     */
  name: {
    type: String as PropType<string>,
  },
  /**
     * 图标颜色
     * @description 支持 `#FFFFFF` 和 `rgba(255,255,0,1)`
     */
  color: {
    type: String as PropType<string>,
  },
  /**
     * 图标大小
     */
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
};
