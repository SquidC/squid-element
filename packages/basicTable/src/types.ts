/**
 * 表格列配置项
 * @author Ming07
 */
export interface TableColumn<T = Object> {
    /**
     * 表格列标题
     */
    label: string
    /**
     * 表格列字段
     * @description 对应列内容的字段名
     */
    field: string
    /**
     * 自定义渲染方法
     */
    render?: (col: unknown, row: T) => JSX.Element
}
