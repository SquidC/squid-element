import { App } from "vue";
import LayoutCrud from "./src/index.vue";

LayoutCrud.install = (app: App): void => {
  app.component(LayoutCrud.name, LayoutCrud);
};

export default LayoutCrud;
export * from "./src/types";
export * from "./src/useModel";
