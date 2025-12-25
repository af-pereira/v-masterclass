import './style.css'
import 'iconify-icon'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// // If we want to handle errors at the highest level, use this here
// app.config.errorHandler = (error) => {
//   // Handle errors here
// }

app.mount('#app')
