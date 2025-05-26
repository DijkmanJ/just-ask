import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

console.log('Initializing app...')

const app = createApp(App)
app.use(router)
app.mount('#app')

console.log('App mounted') 