const fs = require("fs-extra")
const path = require("path")
const util = require("util")

const __dir = path.resolve(__dirname, "..", "website", "src", "docs")
const __websiteSrc = path.resolve(__dirname, "..", "website", "src") + "\\"

fs.readdirSync(__dir).forEach(docsPath => {
  // 具体.md目录
  const docsFullPath = path.resolve(__dir, docsPath)
  const docs = fs.readdirSync(docsFullPath)
  // 通过目录生成路由
  const routes = docs.map(doc => {
    const name = doc.replace(".md", "")
    const componentsPath = path.resolve(docsFullPath, doc)
      .replace(__websiteSrc, "/@/")
      .replace(/\\/g, "/")
      return {
        path: `${name}`,
        name: name,
        component: `() => import('${componentsPath}')`
      }
  })

  const outDir = path.resolve(__websiteSrc, "route", `gen.${docsPath}.ts`)
  fs.writeFileSync(outDir, `export default ${
    util.inspect(routes, false, null, false)
    .replace(/"/g, "") // 因为component里面有单引号所以不会被替换
    .replace(/'/g, "\"")}`)
})

