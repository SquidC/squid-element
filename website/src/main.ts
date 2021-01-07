import { createApp } from "vue";
import SCElement from "squid-element";
import router from "./route";
import App from "./App.vue";
import demoBlock from "./components/demo-block.vue";

import "./styles/index.less";

// 引入 鱿鱼丝组件库样式
import "@squid-element/theme-chalk/src/index.less";

// 引入 鱿鱼丝组件库依赖的element-plus组件库样式
import "element-plus/lib/theme-chalk/index.css";

// 引入 highlight库样式
import "highlight.js/styles/atom-one-light.css";
// import "highlight.js/styles/color-brewer.css";

// 指令
import * as Directives from "@squid-element/directives";

const app = createApp(App);

app.use(router);
app.component("DemoBlock", demoBlock);
app.use(SCElement);

// TODO 加载全部指令
app.directive("Draggable", Directives.Draggable);

app.mount("#app");
export default app;
