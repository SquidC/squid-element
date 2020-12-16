import fs from "fs-extra"
import { ServerPlugin } from "vite"
import chalk from "chalk"
import { RENDER_FILE, renderMD } from "./render"
import { markdownComplier } from "./markdown-complier"
export function createServerPlugin(): ServerPlugin{
  console.log("执行server plugin")
  return ctx => {
    // app        koa
    // watcher    hmr
    // resolver   文件操作
    const { app, watcher, resolver } = ctx

    // hmr vite使用websocket实现热更新
    watcher.on("change", async file => {
      if (file.endsWith(".md")) {
        console.log(chalk.green(`[vite-markdown] `) + `reloading: ${file}`)
        // 相对路径
        const rPath = resolver.fileToRequest(file)
        // 绝对路径
        const aPath = resolver.requestToFile(rPath)
        markdownComplier(aPath)
      }
    })

    // koa洋葱模型 运行时
    app.use(async (ctx, next) => {
      const file = resolver.requestToFile(ctx.path)
      console.log(file)
      // 在缓存里面拿页面
      if(RENDER_FILE.test(ctx.path)){

      }

      // 编译md文件
      if (ctx.path.endsWith(".md")) {

      }
      await next()
    })

  }
}
