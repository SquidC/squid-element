import { createApp } from "vue"
import App from "./App.vue"

// 引入全局样式
import "squid-element/theme-chalk/index.css"

const app = createApp(App)
app.mount("#app")
export default app
