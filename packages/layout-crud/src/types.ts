import { Model } from "@squid-element/hooks";
import { LayoutConfig } from "@squidc/vite-layout";

// layout 提供的所有用户接口事件
export type ActionType =
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
    | "next"
    | "pageSize"
    | "page"
    | "close"

// 工具栏
type Tools = "refresh" | "add";

// 行工具栏
type RawTools = "edit" | "view" | "delete";

// 分页
type Pagination = "prev" | "pager" | "next" | "jumper" | "->" | "total";

// 行工具栏位置
type RawToolsPostion = "header" | "body";

// 控制器
type Controler = "drawer" | "dialog";

/**
 * 服务器api
 */
interface ServerAPI {
    /**
     * 添加数据url
     */
    add: string;
    /**
     * 删除数据url
     */
    del: string;
    /**
     * 修改数据url
     */
    alt: string;
    /**
     * 查询数据url
     */
    sel: string;
}

export interface CrudConfig<DataStruct = unknown> extends
  LayoutConfig<Model<DataStruct>, ActionType, ServerAPI> {
    /**
     * 布局类型
     * @description space 间隔  |  compact 紧凑
     */
    type?: "space" | "compact";
    /**
     * 布局内边距
     */
    padding?: string | number;
    /**
     * 布局头部Icon
     */
    icon?: string;
    /**
     * 布局头部Icon颜色
     */
    iconColor?: string;
    /**
     * 布局头部Icon大小
     */
    iconSize?: string | number;
    /**
     * 页面工具栏配置
     */
    tools?: Array<Tools>;
    /**
     * 行工具栏配置
     */
    rawTools?: Array<RawTools>;
    /**
     * 工具类位置
     */
    rawToolsPostion?: RawToolsPostion;
    /**
     * 分页器
     */
    pageLayout?: Array<Pagination>;
    /**
     * 控制器
     */
    controler?: Controler;
    /**
     * 控制器宽度
     */
    controlerWidth?: string;
}
