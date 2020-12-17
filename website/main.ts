import { createApp } from "vue"
import SCElement from "squid-element"
import router from "./route"
import App from "./App.vue"
import demoBlock from "./components/demo-block.vue"

const app = createApp(App)
app.use(router)
app.component("DemoBlock", demoBlock)
app.use(SCElement)

app.mount("#app")
export default app
