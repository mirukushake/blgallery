import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import ui from '@nuxt/ui/vue-plugin'
import i18n from './plugins/i18n'
import './assets/main.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import lazyLoad from 'vue3-lazyload'

import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const head = createHead()
const app = createApp(App)

app.use(pinia)
app.use(ui)
app.use(head)
app.use(i18n)
app.use(lazyLoad, {})
app.use(router)

app.mount('#app')
