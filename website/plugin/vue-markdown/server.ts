
import { ServerPlugin } from "vite"
import { RENDER_FILE } from "./render"


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
