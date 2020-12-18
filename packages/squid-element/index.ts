import type { App } from "vue"
import { version as version_ } from "./version"

import SCIcon from "@squid-element/icon"
import Test1 from "@squid-element/test1"
import BasicForm from "@squid-element/basicForm"
import BasicTable from "@squid-element/basicTable"
import Icon from "@squid-element/icon"
import Operation from "@squid-element/operation"

const version = version_

const components = [
  SCIcon,
  Test1,
  BasicForm,
  BasicTable,
  Icon,
  Operation,
]

export {
  SCIcon,
  Test1,
  BasicForm,
  BasicTable,
  Icon,
  Operation,
}



const install = (app: App): void => {
  // use(option.locale)
  // app.config.globalProperties.$ELEMENT = option
  // setConfig(option)

  components.forEach(component => {
    app.component(component.name, component)
  })

  // plugins.forEach(plugin => {
  //   app.use(plugin as any)
  // })
}

export default {
  install,
  version,
}
