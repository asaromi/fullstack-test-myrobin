import { createApp } from 'vue'
import App from './App.vue'
import "./assets/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import router from './routes/index.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

// createApp(App).mount('#app')
