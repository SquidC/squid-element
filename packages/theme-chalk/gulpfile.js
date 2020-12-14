"use strict"
/* eslint-disable @typescript-eslint/no-var-requires */
const { series, src, dest } = require("gulp")
const less = require("gulp-less")
const autoprefixer = require("gulp-autoprefixer")
const cssmin = require("gulp-cssmin")
const rename = require("gulp-rename")

const noSCPrefixFile = /(index|base|display)/

// 打包less
function compile() {
  return src("./src/*.less")
    .pipe(less())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(rename(function (path) {
      if(!noSCPrefixFile.test(path.basename)) {
        path.basename = `sc-${path.basename}`
      }
    }))
    .pipe(dest("./lib"))
}

// 复制字体
function copyfont() {
  return src("./src/fonts/**")
    .pipe(cssmin())
    .pipe(dest("./lib/fonts"))
}

exports.build = series(compile, copyfont)
