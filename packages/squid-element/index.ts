import type { App } from "vue";
import { version as version_ } from "./version";

import BasicForm from "@squid-element/basic-form";
import BasicTable from "@squid-element/basic-table";
import Icon from "@squid-element/icon";
import Operation from "@squid-element/operation";

const version = version_;

const components = [
  BasicForm,
  BasicTable,
  Icon,
  Operation,
];

export {
  BasicForm,
  BasicTable,
  Icon,
  Operation,
};



const install = (app: App): void => {
  // use(option.locale)
  // app.config.globalProperties.$ELEMENT = option
  // setConfig(option)

  components.forEach(component => {
    app.component(component.name, component);
  });

  // plugins.forEach(plugin => {
  //   app.use(plugin as any)
  // })
};

export default {
  install,
  version,
};
