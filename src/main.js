import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import serve from "servidio"
import "./style/style.css"

createApp(App).use(router).use(services).mount('#app')
