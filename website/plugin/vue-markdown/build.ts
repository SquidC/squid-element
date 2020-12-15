import { Plugin } from "rollup"


export function createBuildPlugin(): Plugin{
  console.log("执行build plugin")

  // rollup options
  return {
    name: "vueMd",
    resolveId(id){
      console.log("reslove:", id)
      return id
    },
    async load(id) {
      console.log("load", id)

      return null
    },
  }
}
