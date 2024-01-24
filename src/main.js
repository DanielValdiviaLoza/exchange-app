import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/tailwind.css";
import filters from "./filter";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

const app = createApp(App).use(router).use(VueChartkick);

app.config.globalProperties.$filters = filters;
app.mount("#app");
