import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

console.log('Initializing app...')

const app = createApp(App)
console.log('Vue app created')

app.use(router)
console.log('Router installed')

app.mount('#app')
console.log('App mounted to #app element')

// Add error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
} 