import { reactive, toRaw, toRefs } from "vue";

type QueryParams<T> = {
    page: number;
    pageSize: number;
} & T;

/**
 * 操作类型
 * ``` typescript
 * setPage 翻页事件
 * reload 重置条件 (用于添加/编辑后刷新表格)
 * getTable 获取表格数据  用于刷新
 * setFilter 搜索表格 用于搜索
 * refresh 刷新表格 (维持原有搜索条件,再请求一次后台)
 * ```
 */
interface PageAction {
    type: "setPage" | "getTable" | "setFilter" | "reload" | "refresh";
    payload: any;
}

export function usePageReducer<T>(params: QueryParams<T>) {
  const state = reactive({
    initState: params,
    filterState: params,
  });
    /**
     * 下发分页查询动作
     * @param action
     */
  function dispatch(action: PageAction) {
    let filterState = toRaw(state.filterState);
    switch (action.type) {
      case "setPage":
        state.filterState = {
          ...filterState,
          page: action.payload.page || filterState.page,
          pageSize: action.payload.pageSize || filterState.pageSize,
        };
        break;
      case "getTable":
        state.filterState = {
          ...filterState,
          page: 1,
          pageSize: 10,
        };
        break;
      case "setFilter":
        state.filterState = {
          ...filterState,
          ...action.payload,
          page: 1,
          pageSize: 10,
        };
        break;
      case "reload":
        const initState = toRaw(state.initState);
        filterState = {
          ...initState,
          // 传入初始state
          ...action.payload,
        };
        break;
      case "refresh":
        state.filterState = {
          ...filterState,
        };
        break;
      default:
        console.log("没有匹配的page action");
        break;
    }
  }
  return { ...toRefs(state), dispatch };
}
