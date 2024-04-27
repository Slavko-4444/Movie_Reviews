import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AuthCard from "./components/ui/AuthCard.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import store from "./store";


const app = createApp(App);



app.use(router);
app.use(store);

app.use(Vue3Toasity, {
    timeout: 2000
  });
app.component('auth-card', AuthCard)


app.mount('#app')
