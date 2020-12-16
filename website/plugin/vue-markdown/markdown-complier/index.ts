
import fs from "fs-extra"
import md from "./create"


/**
 * markdown 解析器
 * @param path md文件路径
 */
export function markdownComplier(path: string) {
  const filecontent = fs.readFileSync(path).toString()
  const tokens = md.render(filecontent)
  console.log("tokens:",tokens)
}
