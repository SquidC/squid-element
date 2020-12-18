import { App } from "vue"
import  BasicTable from "./src/index.vue"



BasicTable.install = (app: App): void => {
  app.component(BasicTable.name, BasicTable)
}

export default BasicTable
export * from "./src/types"
