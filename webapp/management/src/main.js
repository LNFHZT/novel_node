import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/configure';
import './assets/css/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
