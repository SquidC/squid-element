import { Transform, Plugin } from "vite"

const transform = (): Transform => {
  console.log("执行transform")
  return {
    test: ({ path }) => true,
    transform: ({ code, path }) => {
      console.log("code:",code)
      console.log("path:",path)
      return {
        code: "",
      }
    },
  }
}

export default function createViteMarkDownPlugin(): Plugin {
  console.log("执行vite markdown")
  return {
    transforms: [transform()],
  }
}
