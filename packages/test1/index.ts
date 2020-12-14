import { App } from "vue"
import Test1 from "./src/index.vue"

Test1.install = (app: App): void => {
  app.component(Test1.name, Test1)
}

export default Test1
