import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import router from './routes.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

// createApp(App).mount('#app')
