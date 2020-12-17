import { createApp } from "vue"
import SCElement from "squid-element"
import router from "./route"
import App from "./App.vue"

const app = createApp(App)
app.use(router)

SCElement.install(app)

app.mount("#app")
export default app
