// ✨配置生成路由

/**
 * 加载md文件
 * 作为component文档路由
 */
function loadDocs(){
  return [
    {
      path: "/link",
      name: "link",
      component: () => import("/@/docs/link.md"),
      children: [],
    },
  ]
}

/**
  * 文档
*/
const componentsDocs = [
  // 组件文档
  {
    path: "/component",
    name: "component",
    component: () => import("/@/views/components.vue"),
    children: loadDocs(),
  },
]

/**
 * 主框架路由
*/
export default [
  {
    path: "/",
    name: "Root",
    component: () => import("/@/layout/basic/index.vue"),
    meta: {
      title: "Root",
    },
    children: componentsDocs,
  },
]

