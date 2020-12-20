import { App } from "vue"
import  BasicForm from "./src/index.vue"

BasicForm.install = (app: App): void => {
  app.component(BasicForm.name, BasicForm)
}

export default BasicForm
export * from "./src/types"
