import { UserConfig } from "vite"
import { resolve,join } from "path"

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir)
}
const viteConfig: UserConfig = {
  port: 3050,
  // alias a path to a fs directory
  // 路径别名必须以斜杠开头斜杠结尾
  alias: {
    "/@/": pathResolve("src"),
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        hack: `true; @import "${join(
          __dirname,
          "./src/styles/variables.less",
        )}";`,
      },
      javascriptEnabled: true,
    },
  },
}

export default viteConfig
