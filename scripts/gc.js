const fs = require("fs-extra")
const path = require("path")
const chalk = require("chalk")
const { exit } = require("process")

if(process.argv.length <= 2) {
  console.log(chalk.red("输入生成组件名称为第一个参数"))
  exit()
}
const name = process.argv[2]

const __dir = path.resolve(__dirname, "..", "packages")
const __component = path.resolve(__dir, name)

if (fs.existsSync(__component)) {
  console.log(chalk.red(name), chalk.green("component already exists, please change it"))
}

const __component_src = path.resolve(__component, "src")
const __component_tests = path.resolve(__component, "__tests__")

fs.mkdirSync(__component)
fs.mkdirSync(__component_src)
fs.mkdirSync(__component_tests)

// index.ts
fs.writeFile(path.resolve(__component, "index.ts"),
`import { App } from "vue"
import ${name} from "./src/index.vue"

${name}.install = (app: App): void => {
  app.component(${name}.name, ${name})
}

export default ${name}`)

// package.json
fs.writeFile(path.resolve(__component, "package.json"),
`{
  "name": "@squid-element/${name}",
  "version": "0.0.0",
  "main": "dist/index.js",
  "license": "MIT",
  "peerDependencies": {
    "element-plus": "^1.0.1-beta.7",
    "vue": "^3.0.3"
  },
  "devDependencies": {
    "@vue/test-utils": "^2.0.0-beta.3"
  }
}`)

// src/index.vue
fs.writeFileSync(path.resolve(__component_src, "index.vue"),
`<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "SC${name}",
  props: { },
  setup() {
    // init here
  },
})
</script>`)

// tests/name.spec.ts
fs.writeFileSync(path.resolve(__component_tests, `${name}.spec.ts`),
`import { mount } from "@vue/test-utils"
import ${name} from "../src/index.vue"

const AXIOM = "Rem is the best girl"

describe("${name}.vue", () => {
  test("render test", () => {
    const wrapper = mount(${name}, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
`)
