module.exports = {
  /**
   * 停止向上寻找配置文件
   */
  root: true,
  /**
   * 配置开发环境
   * @description 当前环境下可使用的全局变量
   */
  env: {
    /**
       * 浏览器全局对象
       */
    browser: true,
    /**
       * 允许使用ES6中处理modules之外所有的新特性
       */
    es6: true,
  },
  /**
   * 全局变量
   */
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  /**
   * 配置规则继承
   * @description 后面的规则会覆盖前面的
   */
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "prettier/@typescript-eslint",
  ],
  /**
   * 需要vue-eslint-parser来解析.vue文件
   */
  parser: "vue-eslint-parser",
  /**
   * 解析器配置
   * @description 使用自定义解析器配置
   */
  parserOptions: {
    /**
       * 解析器
       * @description 解析器使用typescript
       */
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      /**
           * 启用jsx
           */
      jsx: true,
    },
  },
  /**
   * 配置插件
   * @description 配置插件名字，可以省略'eslint-plugin-'前缀
   * @description 使用前要用npm安装
   */
  plugins: ["@typescript-eslint", "vue"],
  /**
   * 配置规则
   * @description 常用规则官网：http://eslint.cn/docs/rules/
   */
  rules: {
    // @fixable 必须使用双引号，禁止使用单引号
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    // @fixable 一个缩进必须用四个空格替代
    indent: [
      "error",
      4,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
    // 行最大长度为150
    "max-len": [
      "warn",
      {
        code: 150,
      },
    ],
    "vue/comment-directive": ["warn", {
      "reportUnusedDisableDirectives": false,
    }],
    // vue属性不用一定有默认值
    "vue/require-default-prop": ["off"],
    // vue模板不用默认自闭合标签
    "vue/html-self-closing": ["off"],
  },
  /**
   * 共享规则配置
   */
  settings: {
    "import/parsers": {
      // 使用 TypeScript parser
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      // 让elint识别省略拓展名路径 (解决eslint import/no-unresolved 问题)
      node: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      },
      alias: {
        map: [["@", "./src/"]],
      },
      typescript: {
        // 从 <roo/>@types 读取类型定义
        alwaysTryTypes: true,
      },
    },
  },
  /**
   * 若要禁用一组文件的配置文件中的规则，请使用 overrides 和 files。例如:
   * overrides:
   * [{
   *   "files": ["*-test.js","*.spec.js"],
   *   "rules": {
   *       "no-unused-expressions": "off"
   *    }
   * }]
   */
}
