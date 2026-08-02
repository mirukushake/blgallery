import ui from "@nuxt/ui/vite"
import vue from "@vitejs/plugin-vue"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/blgallery/",
  plugins: [
    vue(),
    ui({
      ui: {
        colors: {
          primary: "primary",
          secondary: "secondary",
          info: "primary",
          success: "success",
          warning: "warning",
          error: "error",
          neutral: "neutral",
        },
        modal: {
          slots: {
            content: "divide-y-0 p-4",
          },
          variants: {
            fullscreen: {
              false: {
                content:
                  "w-8/12 max-w-screen rounded-lg shadow-lg ring ring-default",
              },
            },
          },
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
})
