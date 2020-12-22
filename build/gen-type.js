/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { noSCPrefixFile } = require('./common')

const outsideImport = /import .* from '..\/(.*?)\/src\/.*/
// global.d.ts
fs.copyFileSync(
  path.resolve(__dirname, '../typings/vue-shim.d.ts'),
  path.resolve(__dirname, '../lib/squid-element.d.ts'),
)
// index.d.ts 将全部组件的声明丢出去
const newIndexPath = path.resolve(__dirname, '../lib/index.d.ts')
fs.copyFileSync(path.resolve(__dirname, '../lib/squid-element/index.d.ts'), newIndexPath)
// 修改引用名称
const index = fs.readFileSync(newIndexPath)
const newIndex = index.toString().replace(/@squid-element\//g, './sc-').replace('sc-utils', 'utils')
fs.writeFileSync(newIndexPath, newIndex)

// // 删除 squid-element 全部组件导出声明
fs.rmdirSync(path.resolve(__dirname, '../lib/squid-element'), { recursive: true })

// 删除 test-utils 测试单元
fs.rmdirSync(path.resolve(__dirname, '../lib/test-utils'), { recursive: true })

// component 全部改名
const libDirPath = path.resolve(__dirname, '../lib')
fs.readdirSync(libDirPath).forEach(comp => {
  if (!noSCPrefixFile.test(comp)) {
    if (fs.lstatSync(path.resolve(libDirPath, comp)).isDirectory()) {
      // 改名
      const newCompName = `sc-${comp}`
      fs.renameSync(path.resolve(libDirPath, comp),
        path.resolve(libDirPath, newCompName))
      // 改引用
      const imp = fs.readFileSync(path.resolve(__dirname, '../lib', newCompName, 'index.d.ts')).toString()
      if(outsideImport.test(imp) || imp.includes('@squid-element/')) {
        const newImp = imp.replace(outsideImport, (i, c) => {
          return i.replace(`../${c}`, `../sc-${c}`)
        }).replace('@squid-element/', '../sc-')
        fs.writeFileSync(path.resolve(__dirname, '../lib', newCompName, 'index.d.ts'), newImp)
      }
    }
  }
})

// 替换组件库下面所有@squid-element引用
fs.readdirSync(libDirPath).forEach(comp => {
  // 组件库下面存在src/
  const srcPath = path.resolve(libDirPath, comp, './src')
  if (fs.existsSync(srcPath)) {
    // 是文件夹
    if (fs.lstatSync(srcPath).isDirectory()) {
      // 读取所有文件 替换引用
      fs.readdir(srcPath, 'utf-8', (err, data) => {
        if (err) return
        // replace all @squid-element in src/*.d.ts
        data.forEach(f => {
          if (!fs.lstatSync(path.resolve(srcPath, f)).isDirectory()) {
            const imp = fs.readFileSync(path.resolve(srcPath, f)).toString()
            if (imp.includes('@squid-element/')) {
              const newImp = imp.replace(/@squid-element\//g, '../../sc-')
              fs.writeFileSync(path.resolve(srcPath, f), newImp)
            }
          }
        })
      })
    }
  }
})
