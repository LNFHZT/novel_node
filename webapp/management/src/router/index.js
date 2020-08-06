import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';



let children = [];
function format(router, children, fPath = '') {
  router.forEach(item => {
    if (item.children && item.children.length) {
      if (item.component) {
        item.path = `${fPath}${item.path}`;
        children.push(item);
      }
      format(item.children, children, item.path);
    } else {
      item.path = `${fPath}${item.path}`;
      children.push(item);
    }
  })
}

format(router, children)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '@/views/main/index.vue'),
    children: [...children]
  }
]

Vue.use(VueRouter)
export default new VueRouter({
  routes
})
