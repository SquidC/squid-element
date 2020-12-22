/* eslint-disable @typescript-eslint/no-var-requires */
const cp = require('child_process')
const { getPackagesSync } =  require('@lerna/project')
const ora = require('ora')
const chalk = require('chalk')

// 进度条
const spinner = ora(`${chalk.blue('Building...')}`).start()
// 获取所有组件 使用lerna打包
const pkgs = getPackagesSync()
  .map(pkg => pkg.name)
  .filter(name =>
    name.includes('@squid-element') &&
    // 不用rollup打包
    !name.includes('utils'),
  )
const STEP = 4
const START = 0
const buildChild = (start, end) => {
  let s = start
  let e = end
  // 分多次执行rollup打包命令
  const c1 = cp.spawn('node', ['./build/build.component.js', s, e])
  c1.stdout.on('data', function (data) {
    spinner.info(`${chalk.blue(data)}`)
  })

  c1.stderr.on('data', function (data) {
    spinner.warn(`${chalk.red(data)}`)
  })

  c1.on('close', function (code) {
    s += STEP
    e += STEP
    if (s > pkgs.length) {
      spinner.succeed(`${chalk.green('Build done. Exit code ' + code)}`)
      return
    }
    buildChild(s, e)
  })
}

/**
 * @link https://github.com/ezolenko/rollup-plugin-typescript2/issues/177
 */
buildChild(START, STEP)
