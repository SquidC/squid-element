import { UserConfig } from "vite";
import path from "path";
import vueMd from "@squidc/vite-md";
import vueLayout from "@squidc/vite-layout";
import vue from "@vitejs/plugin-vue-jsx";
import vueJsx from "@vitejs/plugin-vue";

console.log(path.posix.join(".", "public"));

function pathResolve(dir: string) {
  return path.resolve(__dirname, dir);
}

const viteConfig: UserConfig = {
  root: ".",
  server: {
    port: 3050,
    proxy: {
      "/lang": "http://localhost:4399/assets/",
    },
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
          true;@import "${path.join(__dirname, "./src/styles/index.less")}";
          `,
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vueMd(),
    vueLayout(),
    vue(),
    vueJsx(),
  ],
  optimizeDeps: {
    include: ["highlight.js"],
    exclude: ["@squidc/vue-i18next"],
  },
};

export default viteConfig;
