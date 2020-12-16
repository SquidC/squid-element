/**
 * markdown渲染成vue
*/

import MarkdownIt from "markdown-it"

// 渲染文件
export const RENDER_FILE = /(.*?\.md)_(vdpv_\d+)/

// md 实例
const md =  new MarkdownIt({

})

export function renderMD(fileContent: string) {

  console.log(fileContent)

  md.render(fileContent)

  return ""
}
