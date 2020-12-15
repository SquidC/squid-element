import { UserConfig } from "vite"
import { resolve, join } from "path"
import vueMd from "./plugin/vue-markdown"
function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir)
}
const viteConfig: UserConfig = {
  port: 3050,
  // alias a path to a fs directory
  // 路径别名必须以斜杠开头斜杠结尾
  alias: {
    "/@/": pathResolve("."),
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        hack: `true; @import "${join(
          __dirname,
          "./styles/index.less",
        )}";`,
      },
      javascriptEnabled: true,
    },
  },
  plugins: [
    vueMd(),
  ],
}

export default viteConfig
