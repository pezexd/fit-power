import "./assets/main.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import uiPlugin from "@nuxt/ui/vue-plugin";

import App from "./App.vue";

const app = createApp(App);

const router = createRouter({
  routes,
  history: createWebHistory(),
});

app.use(uiPlugin);
app.use(router);

app.mount("#app");
