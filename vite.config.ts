import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { PrimeVueResolver } from "@primevue/auto-import-resolver"
import { visualizer } from "rollup-plugin-visualizer"
import ui from "@nuxt/ui/vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/blgallery/",
  plugins: [
    vue(),
    ui(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
})
