// ✨配置生成路由
import layout from "./gen.layout";
import component from "./gen.components";


/**
 * 布局文档
 */
const layoutDocs = {
  path: "/layout",
  name: "layout",
  component: () => import("@/layout/basic/doc.vue"),
  redirect: "/layout/crud",
  meta: {
    title: "布局文档",
  },
  children: layout,
};

/**
 * 组件文档
 */
const componentsDocs = {
  path: "/components",
  name: "components",
  component: () => import("@/layout/basic/doc.vue"),
  redirect: "/components/link",
  meta: {
    title: "组件文档",
  },
  children: component,
};

/**
 * 主框架路由
 */
export default[
  {
    path: "/",
    name: "Root",
    component: () => import("@/layout/basic/index.vue"),
    redirect: "/components/link",
    meta: {
      title: "Root",
    },
    children: [
      componentsDocs,
      layoutDocs,
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/test.vue"),
      },
    ],
  },
];
