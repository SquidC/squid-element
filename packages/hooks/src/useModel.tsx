import { FormItem, Widget } from "@squid-element/basic-form";
import { TableColumn } from "@squid-element/basic-table";
import { reactive } from "vue";

type Mode = "add" | "edit" | "search" | "view" | "table";
/**
 * 数据实体配置
 */
export type Model<T> = {
    [P in keyof T]?: Scope;
};

interface ScopeOpt {
    /**
     * 字段模式
     * @description 表示域在配置的表单模式里显示
     */
    mode?: Mode[];
    /**
     * form表单默认值
    */
    default?: unknown;
}

/**
 * 控件配置项
 */
type WidgetOpt = CurrWidget<"Radio"> | CurrWidget<"Input"> | CurrWidget<"Checkbox"> | CurrWidget<"Switch"> | CurrWidget<"Element">;

type Scope = WidgetOpt & ScopeOpt;

/**
 * 过滤控件类型
 */
type FilterWidget<T = FormItem, U = Widget> = {
    [Key in keyof T]: T[Key] extends U ? Omit<T, "field"> : never;
};

/**
 * 真正的控件类型
 */
type CurrWidget<DynamicType = Widget> = Pick<FilterWidget<FormItem, DynamicType>["type"], keyof FilterWidget<FormItem, DynamicType>["type"]>;


export function useModel<DataStruct = {}>(
    formColumns: Model<DataStruct>,
  ): {
    tableColumns: TableColumn<DataStruct>[],
    formItems: FormItem[],
    form: DataStruct,
  } {
    const tableColumns = []
    const formItems = []
    let form = {} as DataStruct

    Object.keys(formColumns).forEach((field) => {
      const scope: Scope = formColumns[field]
      tableColumns.push({
        field: field,
        label: scope.label,
        // TODO render
      })
      formItems.push(scope)
      // 默认值
      scope.default && (form[field] = scope.default)
    })

    return {
      tableColumns,
      formItems,
      form
    }
}
