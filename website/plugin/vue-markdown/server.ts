
import { ServerPlugin } from "vite"
export function createServerPlugin(): ServerPlugin{
  console.log("执行server plugin")
  return ({ app, watcher, resolver }) => {
    const a = app
    console.log("app:",app)
    console.log("watcher:",watcher)
    console.log("resolver:",resolver)
  }
}
