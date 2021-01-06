import { UserConfig } from "vite"
import { resolve } from "path"

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir)
}
const viteConfig: UserConfig = {
  port: 3050,
  // alias a path to a fs directory
  // 路径别名必须以斜杠开头斜杠结尾
  alias: {
    "@/": pathResolve("src"),
  },
  optimizeDeps: {
    include: ["element-plus"],
  },
}

export default viteConfig
