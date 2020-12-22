import { PropType } from "vue"
import { FormItem, Widget, Option } from "./types"

/**
 * BasicForm 组件属性
 */
export const props = {
  /**
     * 表单数据对象
     * @description 用于表单初始化
     * @description 没有双向绑定,完整表单对象在提交的时候获取
     */
  model: {
    type: Object as PropType<{ [key: string]: any; }>,
    default: {},
  },
  /**
     * 表单域配置项集合
     */
  formItems: {
    type: Array as PropType<FormItem[]>,
    default: [],
  },
  /**
     * 表单域标签的位置
     * @description 如果值为 left 或者 right 时，则需要设置 label-width
     */
  labelPosition: {
    type: String as PropType<"top" | "left" | "right">,
    default: "right",
  },
  /**
     * 表单域标签的宽度
     */
  labelWidth: {
    type: String,
    default: "auto",
  },
  /**
     * 表单域标签的后缀
     */
  labelSuffix: {
    type: String,
  },
  /**
     * 是否禁用该表单内的所有组件
     */
  disabled: {
    type: Boolean,
    default: false,
  },
}

/**
 * 表单控件属性
 */
export const FormWidgetProps = {
  modelValue: {
    type: [String, Number, Object, Array, Boolean] as PropType<unknown>,
  },
  /**
     * 表单控件类型
     */
  type: {
    type: String as PropType<Widget>,
    default: "input",
    required: true,
  },
  options: {
    type: Array as PropType<Option[]>,
  },
  render: {
    type: Function as PropType<(formItem: FormItem, value: any) => JSX.Element>,
  },
}
