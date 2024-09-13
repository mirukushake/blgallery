import { createApp } from "vue"
import { createPinia } from "pinia"
import { createHead } from "@unhead/vue"
import i18n from "./plugins/i18n"
import "./style.scss"
import App from "./App.vue"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import PrimeVue from "primevue/config"
import { definePreset } from "@primevue/themes"
import Aura from "@primevue/themes/aura"
import DialogService from "primevue/dialogservice"
import ToastService from "primevue/toastservice"
import router from "./router"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const head = createHead()
const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
  },
})

app.use(pinia)
app.use(head)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {},
  },
})
app.use(DialogService)
app.use(ToastService)
app.use(router)

app.mount("#app")
