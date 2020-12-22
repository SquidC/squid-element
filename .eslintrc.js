module.exports = {
  /**
   * 停止向上寻找配置文件
   */
  root: true,
  /**
   * 需要vue-eslint-parser来解析.vue文件
   */
  parser: "vue-eslint-parser",
  /**
   * 解析器配置
   * @description 使用自定义解析器配置
   */
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  /**
   * 配置开发环境
   * @description 当前环境下可使用的全局变量
   */
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  /**
   * 配置插件
   * @description 配置插件名字，可以省略'eslint-plugin-'前缀
   * @description 使用前要用npm安装
   */
  plugins: [
    "@typescript-eslint",
    "vue",
  ],
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
   * 配置规则
   * @description 常用规则官网：http://eslint.cn/docs/rules/
   */
  rules: {
    // js/ts
    "eol-last": "error",
    "no-trailing-spaces": "error",
    "comma-style": ["error", "last"],
    "comma-dangle": ["error", "always-multiline"],
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
    camelcase: ["error", { properties: "never" }],
    semi: ["error", "never"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "object-curly-spacing": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: false,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
    // vue
    "vue/no-v-html": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": ["error", {
      html: {
        void: "never",
        normal: "never",
        component: "always",
      },
    }],
    "vue/max-attributes-per-line": ["error", {
      singleline: 3,
      multiline: 1,
    }],
    "vue/require-default-prop": "off",
    "vue/html-closing-bracket-spacing": "error",
    "@typescript-eslint/ban-types": "off",
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
}
