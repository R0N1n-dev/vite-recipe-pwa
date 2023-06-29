import Vue from "vue";
import { registerSW } from "virtual:pwa-register";
import "boxicons/css/boxicons.min.css";
import Inkline from "@inkline/inkline";
import "@inkline/inkline/dist/inkline.css";
import router from "./router";
import App from "./App.vue";
const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
Vue.use(Inkline);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
