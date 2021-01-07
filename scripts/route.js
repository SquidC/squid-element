/* eslint-disable */
const fs = require("fs-extra");
const path = require("path");
const util = require("util");

const __dir = path.resolve(__dirname, "..", "website", "src", "docs");
const __websiteSrc = path.resolve(__dirname, "..", "website", "src") + "\\";

/**
 * 读取页面文件下所有内容
 * @param rootDir 文件根目录
 * @param formatRouteConfigModel 格式化目录输出路由样式
 * @param rootFiles 文件根目录的文件
 */
function deepFile(rootDir, formatRouteConfigModel, rootFiles) {
  const routes = [];
  if (!rootFiles) {
    rootFiles = fs.readdirSync(rootDir);
  }
  rootFiles.forEach(el => {
    const subdir = path.resolve(rootDir, el);
    let children = []
    if (fs.statSync(subdir).isDirectory()) { // 是一个目录
      const files = fs.readdirSync(subdir);
      // 遍历子目录
      children = deepFile(subdir, formatRouteConfigModel, files);
    }
    routes.push(formatRouteConfigModel(el, subdir, children));
  });
  return routes;
}

// 遍历docs下目录
fs.readdirSync(__dir).forEach(docsPath => {
  // 具体.md目录
  const docsFullPath = path.resolve(__dir, docsPath);

  // 通过目录生成路由
  const routes = deepFile(docsFullPath, (basename, currentPath, children) => {
    const path = currentPath.replace(__dir, "").replace(".md", "").replace(/\\/g, "/")
    basename = basename.replace(".md", "")
    const routeConfig = { // 默认设置
      path: path,
      name: basename,
    }
    if (children?.length) { // 有子目录 使用写好的路由模板
      routeConfig.component = `() => import('@/layout/basic/doc.vue')`
      routeConfig.children = children
    } else { // 没有子目录
      // 组件路径
      const componentsPath = currentPath.replace(__websiteSrc, "@/").replace(/\\/g, "/");
      routeConfig.component = `() => import('${componentsPath}')`
    }
    return routeConfig
  })

  // menus
  const menus = deepFile(docsFullPath, (basename, currentPath, children) => {
    const path = currentPath.replace(__dir, "").replace(".md", "").replace(/\\/g, "/")
    const routeConfig = { // 默认设置
      path: path,
      name: basename,
    }
    if (children?.length) { // 有子目录 使用写好的路由模板
      routeConfig.children = children
    } else { // 没有子目录
    }
    return routeConfig
  })

  // route
  const outRouteDir = path.resolve(__websiteSrc, "route", `gen.${docsPath}.ts`);
  fs.writeFileSync(outRouteDir, `export default ${
    util.inspect(routes, false, null, false)
      .replace(/"/g, "") // 因为component里面有单引号所以不会被替换
      .replace(/'/g, "\"")}`);

  // menu
  const outMenuDir = path.resolve(__websiteSrc, "layout", `gen.${docsPath}.ts`);
  fs.writeFileSync(outMenuDir, `export default ${
    util.inspect(menus, false, null, false)
      .replace(/"/g, "") // 因为component里面有单引号所以不会被替换
      .replace(/'/g, "\"")}`);
});

