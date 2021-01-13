import { PropType } from "vue";
import { CrudConfig } from "./types";

/**
 * CRUD布局组件属性
 */
export const props = {
  config: {
    type: Object as PropType<CrudConfig>,
    require: true,
  },
};

/**
 * 默认配置
 */
export const __defaultConfig: CrudConfig = {
  // layout
  type: "space",
  padding: "16px",
  icon: "wanju",
  iconColor: "#000000",
  iconSize: "16px",
  tools: ["add", "refresh"],
  rawTools: ["edit", "view", "delete"],
  rawToolsPostion: "body",
  pageLayout: ["prev", "jumper", "total", "next"],
  controler: "drawer",
  controlerWidth: "450px",

  // 必须
  layout: "Crud",
  title: "crud",
  // crud api
  api: {
    add: "https://localhost/add",
    del: "https://localhost/del",
    alt: "https://localhost/alt",
    sel: "https://localhost/sel",
  },
  // 处理按钮事件
  handleAction: (mode, raw, ids) => {
    console.log("handleAction", mode, raw, ids);
  },
  // 页面配置
  columns: {},
};
