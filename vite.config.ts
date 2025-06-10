import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueRouter from "unplugin-vue-router/vite";

import ui from "@nuxt/ui/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueRouter(),
    vue(),
    ui({
      ui: {
        colors: {
          primary: "blue",
          neutral: "slate",
        },
      },
    }),
  ],
});
