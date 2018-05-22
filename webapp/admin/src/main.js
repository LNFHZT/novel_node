import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'

// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
// 配置
function ElementError(Option) {
  ElementUI.Message.error(Option)
}
// axios 配置
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.method = 'POST'

axios.interceptors.response.use(
  response => {
    response.data.response = response;
    if (response.status != '200') {
      ElementError({
        message: '请求失败，请求code=' + response.status,
        type: 'error'
      })
      return Promise.reject(response.data);
      // ElementUI.$mount()
    }
    if (!response.data.success) {
      ElementError({
        message: response.data.msg,
        type: 'error'
      })
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')