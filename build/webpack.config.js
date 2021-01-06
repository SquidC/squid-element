/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const libMode = process.env.LIBMODE;
const isFullMode = libMode === "full";
let externals = [
  {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
    },
  },
];

// 不是全部引入
// 以下包使用外部引入
if (!isFullMode) {
  externals.push({
    "mitt": "mitt",
  },
  /^lodash.*/);
}

const config = {
  mode: "production",
  entry: path.resolve(__dirname, "../packages/squid-element/index.ts"),
  output: {
    path: path.resolve(__dirname, "../lib"),
    publicPath: "/",
    filename: isFullMode ? "index.full.js" : "index.js",
    libraryTarget: "umd",
    library: "squid-element",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  externals,
  plugins: [
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};

module.exports = config;
