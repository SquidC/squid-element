import MarkdownIt from "markdown-it"
import MarkdownItContainer from "markdown-it-container"
/**
 * 添加自定义fence规则
 * @param md
 */
export function changeRule(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence
  md.use(MarkdownItContainer, "demo", {
    validate: function(params) {
      return params.trim() === "demo"
    },
    render: (tokens, idx, options, env, self) => {

      const token = tokens[idx]
      // 判断该 fence 是否在 :::demo 内
      const prevToken = tokens[idx]
      console.log("prevToken:",prevToken)

      const isInDemoContainer =
      prevToken &&
      prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/)
      console.log("isInDemoContainer:",isInDemoContainer)
      if (token.info === "fence" && isInDemoContainer) {
        console.log("--------匹配到----------")
        return `<template #highlight><pre v-pre><code class="html">${md.utils.escapeHtml(
          token.content,
        )}</code></pre></template>`
      } else {
        return defaultRender(tokens, idx, options, env, self)
      }
    },
  })
}
