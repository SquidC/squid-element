import { UserConfig } from "vite";
import { resolve, join } from "path";
import vueMd from "@squidc/vite-md";

function pathResolve(dir: string) {
  return resolve(__dirname, dir);
}
console.log(`true;@import "${join(__dirname, "./src/styles/index.less")}";`);
const viteConfig: UserConfig = {
  port: 3050,
  // alias a path to a fs directory
  // 路径别名必须以斜杠开头斜杠结尾
  alias: {
    "/@/": pathResolve("./src/"),
  },
  cssPreprocessOptions: {
    less: {
      modifyVars: {
        hack: `
        true;@import "${join(__dirname, "./src/styles/index.less")}";
        `,
      },
      javascriptEnabled: true,
    },
  },
  plugins: [
    vueMd(),
  ],
  // 设置深依赖
  optimizeDeps: {
    include: ["element-plus","highlight.js"],
  },
};

export default viteConfig;
