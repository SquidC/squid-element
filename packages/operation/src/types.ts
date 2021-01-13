/**
 * 功能
 */
export type Tool =
  | "add"
  | "edit"
  | "view"
  | "delete"
  | "more"
  | "activate"
  | "forbidden"
  | "refresh"
  | "export"
  | "search"
  | "compose"
  | "prev"
  | "next";

/**
 * 操作栏组件属性
 * @author Ming07
 */
export interface OperationProps {
  /**
   * 表格行数据
   */
  row?: unknown
  /**
   * 图标颜色
   */
  color?: string
  /**
   * 图标大小
   */
  size?: number | string
  /**
   * 功能列表
   */
  tools?: Tool[]
  /**
   * 额外功能列表
   * @description 藏在更多按钮里面
   */
  extras?: Tool[]
  /**
   * 自定义内容
   */
  content?: JSX.Element
  /**
   * 功能点击事件
   * @param {Tool} type 功能类型
   * @param {unknown} row 点击的表格行数据
   */
  toolClick?: (type: Tool, row?: unknown) => void
  /**
   * 是否为按钮样式
   */
  button?: boolean
}
