"use strict"
/* eslint-disable @typescript-eslint/no-var-requires */
const { series, src, dest } = require("gulp")
const less = require("gulp-less")
const autoprefixer = require("gulp-autoprefixer")
const cssmin = require("gulp-cssmin")
const rename = require("gulp-rename")
const concat = require("gulp-concat") // 合并css
const sass = require("gulp-sass") // 编译scss 为 css

const browserSync = require("browser-sync").create()
const reload = browserSync.reload

const noSCPrefixFile = /(index|base|display)/
// import "element-plus/lib/theme-chalk/index.css"

// 打包element-plus 样式
function compileElementPlus() {
  // FIXME 以后可以直接生成一份element-plus样式放在src/
  return src("../../node_modules/element-plus/lib/theme-chalk/index.css")
    .pipe(sass()) // sass编译
    .pipe(dest("./lib/element-plus-theme"))
    .pipe(reload({ stream: true }))
}

// 打包less
function compileLess() {
  return src("./src/*.less")
    // less编译
    .pipe(less())
    // autoprefixer这是一款自动管理浏览器前缀的插件，
    // 它可以解析CSS文件并且添加浏览器前缀到CSS内容里
    .pipe(autoprefixer({ cascade: false }))
    // 压缩css
    .pipe(cssmin())
    // 改名
    .pipe(rename(function (path) {
      if(!noSCPrefixFile.test(path.basename)) {
        path.basename = `sc-${path.basename}`
      }
    }))
    .pipe(dest("./lib"))
    .pipe(reload({ stream: true }))
}

// 合并任务
function concatCss(){
  return src([
    "./lib/index.css", // less编译结果
    "./lib/element-plus-theme/index.css", // element-plus编译结果
  ])
    // 连接css
    .pipe(concat("index.css"))
    // autoprefixer这是一款自动管理浏览器前缀的插件，
    // 它可以解析CSS文件并且添加浏览器前缀到CSS内容里
    .pipe(autoprefixer({ cascade: false }))
    // 压缩css
    .pipe(cssmin())
    .pipe(dest("./lib"))
}


// 复制字体
function copyfont() {
  return src("./src/fonts/**")
    .pipe(cssmin())
    .pipe(dest("./lib/fonts"))
}

exports.build = series(
  compileLess,
  compileElementPlus,
  concatCss,
  copyfont,
)
