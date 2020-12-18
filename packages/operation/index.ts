import { App } from "vue"
import Operation from "./src/index.vue"


Operation.install = (app: App): void => {
  app.component(Operation.name, Operation)
}

export default Operation
export * from "./src/types"
