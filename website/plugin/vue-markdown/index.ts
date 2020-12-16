import { Plugin } from "vite"
import { createBuildPlugin } from "./build"
import { createServerPlugin } from "./server"

export default function createVueMarkDownPlugin(): Plugin {
  return {
    configureServer: [createServerPlugin()],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rollupPluginVueOptions: {
      include: /\.(vue|md)$/,
    },
    rollupInputOptions: {
      plugins: [createBuildPlugin()],
    },
  }
}
