import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from 'pinia-plugin-persistedstate';
import Dropdown from './support/utils';

import App from "./App.vue";
import router from "./router/router";
import Message from "vue-m-message";

import "./assets/tailwind.css";

import "vue-m-message/dist/style.css";
import "material-icons/iconfont/material-icons.css";

const VMessageOptions = {
  name: "admin-dashboard",
  defaultOptions: { closable: true, position: "top-right", width: "300px" },
};

const app = createApp(App);
const pinia = createPinia().use(createPersistedState());

// this allows the use of router inside pinia store
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(Message, VMessageOptions);
app.use(pinia);
app.use(router);

app.mount("#app");

new Dropdown()
