import fs from "fs-extra"
import { ServerPlugin } from "vite"
import chalk from "chalk"
import { RENDER_FILE, renderMD } from "./render"

export function createServerPlugin(): ServerPlugin{
  console.log("执行server plugin")
  return ctx => {
    // app        koa
    // watcher    hmr
    // resolver   文件操作
    const { app, watcher, resolver } = ctx

    // hmr vite使用websocket实现热更新
    watcher.on("change", async file => {
      console.log("监听到文件变动:",file)
      if (file.endsWith(".md")) {
        console.log(chalk.green(`[vite-markdown] `) + `reloading: ${file}`)
        const rPath = resolver.fileToRequest(file)
        const aPath = resolver.requestToFile(rPath)

        // 读取变更文件
        const fileContent = fs.readFileSync(aPath).toString()
        renderMD(fileContent)
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
