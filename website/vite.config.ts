import { UserConfig } from "vite";
import { resolve, join } from "path";
import vueMd from "@squidc/vite-md";
import vue from "@vitejs/plugin-vue-jsx";
import vueJsx from "@vitejs/plugin-vue";

function pathResolve(dir: string) {
  return resolve(__dirname, dir);
}

const viteConfig: UserConfig = {
  server: {
    port: 3050,
  },
  // alias a path to a fs directory
  // 路径别名必须以斜杠开头斜杠结尾
  alias: {
    "@": pathResolve("src"),
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `
          true;@import "${join(__dirname, "./src/styles/index.less")}";
          `,
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vueMd(),
    vue(),
    vueJsx(),
  ],
  assetsInclude: ["woff"],
  optimizeDeps: {
    include: ["highlight.js"],
  },
};

export default viteConfig;
