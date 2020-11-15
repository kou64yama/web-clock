import Vue from "vue";
import CompositionApi from "@vue/composition-api";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(CompositionApi);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
