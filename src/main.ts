import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

createApp(App)
.use(createPinia().use(piniaPluginPersistedState))
.mount('#app')
