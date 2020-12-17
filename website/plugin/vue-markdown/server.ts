import fs from "fs-extra"
import chalk from "chalk";
import { ServerPlugin } from "vite";
import { markdownComplier } from "./markdown-complier";

export function createServerPlugin(): ServerPlugin {
  console.log("执行server plugin");
  return ctx => {
    // app        koa
    // watcher    hmr
    // resolver   文件操作
    const { app, watcher, resolver } = ctx;

    // hmr vite使用websocket实现热更新
    watcher.on("change", async file => {
      if (file.endsWith(".md")) {
        console.log(chalk.green(`[vite-markdown] `) + `reloading: ${file}`);
        // 相对路径
        const rPath = resolver.fileToRequest(file);
        // 绝对路径
        const aPath = resolver.requestToFile(rPath);

        // 将md编译成vue
        const component = markdownComplier(aPath)

        // 使用vite-vue-plugin编译 覆盖原来文件
        watcher.handleVueReload(aPath, Date.now(), component)
      }
    });

    // koa洋葱模型 运行时
    app.use(async (ctx, next) => {
      // 绝对路径
      const aPath = resolver.requestToFile(ctx.path);
      if (!fs.existsSync(aPath)) {
        await next()
        return
      }
      if(ctx.path.endsWith(".md")) {
        console.log("file", aPath)
        const component = markdownComplier(aPath)
        ctx.vue = true
        // 将md编译成vue
        ctx.body = component
        await next();
        return
      }
      await next()
    });
  };
}
