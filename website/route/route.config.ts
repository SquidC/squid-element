// ✨配置生成路由

/**
 * 加载md文件路由
 */
function loadDocs(){
  return []
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
const RootLayout = [{
  path: "/",
  name: "Root",
  component: () => import("/@/layout/basic/index.vue"),
  meta: {
    title: "Root",
  },
  children: componentsDocs,
}]

export default [RootLayout]

