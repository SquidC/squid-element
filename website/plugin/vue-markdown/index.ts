import { Plugin } from "vite"
import { createBuildPlugin } from "./build"
import { createServerPlugin } from "./server"


export default function createVueMarkDownPlugin(): Plugin {
  return {
    configureServer: [createServerPlugin()],
    rollupInputOptions: {
      plugins: [createBuildPlugin()],
    },
  }
}
