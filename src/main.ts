import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { useThemeStore } from './stores/theme'

const app = createApp(App)

app.use(pinia)
useThemeStore(pinia).initializeTheme()
app.use(router)
app.mount('#app')
