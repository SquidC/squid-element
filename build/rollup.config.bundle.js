import vue from "rollup-plugin-vue";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import path from "path";
// import commonjs from '@rollup/plugin-commonjs'
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "../package.json";
const deps = Object.keys(pkg.dependencies);

// 打包.d.ts
export default [
  {
    input: path.resolve(__dirname, "../packages/squid-element/index.ts"),
    output: {
      format: "es",
      file: "lib/index.esm.js",
    },
    plugins: [
      // terser插件在rollup.js打包过程中实现代码压缩
      terser(),
      // 合并外部模块代码
      nodeResolve(),
      babel({
        exclude: "node_modules/**",
        extensions: [".tsx", ".jsx"],
        runtimeHelpers: true,
      }),
      // commonjs({

      // }),
      // 打包vue
      vue({
        target: "browser",
        css: false,
        exposeFilename: false,
      }),
      // 打包ts
      typescript({
        // 修改tsconfig配置
        tsconfigOverride: {
          "include": [
            "packages/**/*",
            "typings/vue-shim.d.ts",
          ],
          "exclude": [
            "node_modules",
            "packages/**/__tests__/*",
          ],
        },
        abortOnError: false,
      }),
    ],
    // 判断包是否外部引入
    external(id) {
      // [vue || element-plus || 根目录的package.json 依赖] 使用外部引入
      return /^vue/.test(id)
        || /^element-plus/.test(id)
        || deps.some(k => new RegExp("^" + k).test(id));
    },
  },
];
