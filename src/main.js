// The Vue build version to load with the `import` command
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import '@/css/index.css'
import store from "@/store/index";

Vue.config.productionTip = false
Vue.use(Mint);
Vue.use(Resource);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

