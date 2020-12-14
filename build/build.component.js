/* eslint-disable */
// https://www.rollupjs.com/guide/javascript-api
const pkg = require('../package.json')
const path = require('path')
const { getPackages } =  require('@lerna/project')
const css = require('rollup-plugin-css-only')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue')
const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const { noSCPrefixFile } = require('./common')

const deps = Object.keys(pkg.dependencies)

const runBuild = async () => {
  let index = 0
  const pkgs = await getPackages()
  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name =>
      name.includes('@squid-element') &&
      !name.includes('utils'),
    ).slice(process.argv[2], process.argv[3])

  build(inputs[index])

  // rollup 构建组件
  async function build(name) {
    if (!name) return

    const getOutFile = () => {
      const compName = name.split('@squid-element/')[1]
      if(noSCPrefixFile.test(name)) {
        return `lib/${compName}/index.js`
      }
      return `lib/sc-${compName}/index.js`
    }

    const inputOptions = {
      input: path.resolve(__dirname, `../packages/${name.split('@squid-element/')[1]}/index.ts`),
      plugins: [
        // 打包node
        nodeResolve(),
        // 打包css
        css(),
        // 打包vue 不能使用css
        vue({
          target: 'browser',
          css: false,
        }),
        // 打包typescript
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              // 不打包声明文件.d.ts
              declaration: false,
            },
            'exclude': [
              'node_modules',
              '__tests__',
            ],
          },
          abortOnError: false,
        }),
      ],
      external(id) {
        return /^vue/.test(id)
          || /^@squid-element/.test(id)
          || deps.some(k => new RegExp('^' + k).test(id))
      },
    }


    const outOptions = {
      format: 'es',
      file: getOutFile(),
      paths(id) {
        if (/^@squid-element/.test(id)) {
          if (noSCPrefixFile.test(id)) return id.replace('@squid-element', '..')
          return id.replace('@squid-element/', '../sc-')
        }
      },
    }

    // 创建buudle
    const bundle = await rollup.rollup(inputOptions)
    console.log(name, 'done')
    await bundle.write(outOptions)
    index++
    if (index < inputs.length) {
      await build(inputs[index])
    }
  }
}

runBuild()
