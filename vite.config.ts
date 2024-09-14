import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { PrimeVueResolver } from "@primevue/auto-import-resolver"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const enviro = env.VITE_ENV
  return {
    base: enviro === "dev" ? "/" : "/blgallery/",
    plugins: [
      vue(),
      Components({
        resolvers: [PrimeVueResolver()],
      }),
    ],
  }
})
