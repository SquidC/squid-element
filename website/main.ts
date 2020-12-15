import { createApp } from "vue"
import router from "./route"
import App from "./App.vue"

const app = createApp(App)
app.use(router)
app.mount("#app")
export default app
