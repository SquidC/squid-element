import { FieldErrorList } from "async-validator"

/**
 * 选项
 * @author Ming07
 */
export interface Option {
  /**
   * 选项值
   */
  value: string | number
  /**
   * 选项名称
   */
  label?: string | number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 选项子集
   */
  children?: Option[]
}

/**
 * 控件类型
 */
export type Widget =
    | "Input"
    | "TextArea"
    | "Select"
    | "Switch"
    | "DatePicker"
    | "Checkbox"
    | "InputNumber"
    | "RangePicker"
    | "Image"
    | "Radio"
    | "Cascader"
    | "Element"
    | "File"
    | "Map"
    | "Point"
    | "Area"
    | "ImageMultiple"
    | "Checker";

/**
 * 表单域配置项
 */
export type FormItem = InputWidget | SelectWidget | CheckboxWidget | RadioWidget | SwitchWidget | ElementWidget;

/**
 * 基础表单域
 */
export interface BasicFormItem {
    /**
     * 表单控件类型
     */
    type: Widget
    /**
     * 表单域标签
     * @description 字段显示名称
     */
    label: string
    /**
     * 表单域字段
     * @description 表单域 model 字段
     * @description 在使用 validate、resetFields 方法的情况下，该属性是必填的
     */
    field: string
    /**
     * 表单域的子域字段
     * @description 用于表单域值是对象时
     */
    scope?: string
    /**
     * 表单验证规则
     */
    rules?: object | []
    /**
     * 是否禁用
     */
    disabled?: boolean
}

export interface InputWidget extends BasicFormItem {
    type: "Input"
    /**
     * 原生属性，最大输入长度
     */
    maxlength?: number
    /**
     * 原生属性，最大输入长度
     */
    minlength?: number
}

export interface SelectWidget extends BasicFormItem {
    type: "Select"
    /**
     * 选项配置
     */
    options: Option[]
    /**
     * 是否多选
     */
    multiple?: boolean
}

export interface CheckboxWidget extends BasicFormItem {
    type: "Checkbox"
    /**
     * 选项配置
     */
    options: Option[]
    /**
     * 可被勾选的 checkbox 的最小数量
     */
    min?: number
    /**
     * 可被勾选的 checkbox 的最大数量
     */
    max?: number
}

export interface RadioWidget extends BasicFormItem {
    type: "Radio"
    /**
     * 选项配置
     */
    options: Option[]
}

export interface ElementWidget extends BasicFormItem {
    type: "Element"
    /**
     * 自定义渲染元素方法,必须返回一个元素，否则报错,
     * @param value 当前行的字段值
     * */
    render: (formItem: FormItem, value: any) => JSX.Element
}

export interface SwitchWidget extends BasicFormItem {
    type: "Switch"
    /**
     * switch 打开时的值
     */
    activeValue?: boolean | string | number
    /**
     * switch 关闭时的值
     */
    inactiveValue?: boolean | string | number
    /**
     * switch 打开时的文字描述
     */
    activeText?: string
    /**
     * switch 关闭时的文字描述
     */
    inactiveText?: string
}

export interface Callback {
    (isValid?: boolean, invalidFields?: FieldErrorList): void
}

/**
 * ElForm组件实例
 */
export interface Instance {
    /**
     * 校验表单
     */
    validate: (callback?: Callback) => Promise<boolean>
    /**
     * 重置表单
     */
    resetFields: () => void
}
