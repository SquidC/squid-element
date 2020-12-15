import { Plugin } from "rollup"
export function createBuildPlugin(): Plugin{
  console.log("执行build plugin")
  return {
    name: "vueMd",
    resolveId(id){
      console.log("reslove:",id)
      return id
    },
  }
}
