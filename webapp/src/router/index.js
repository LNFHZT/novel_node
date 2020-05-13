import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "about" */ '@/views/main/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/home/Home.vue'),
        meta: { title: '系统首页' }
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: () => import(/* webpackChunkName: "about" */ '@/views/userManage/UserManage.vue'),
        meta: { title: '用户列表' }
      },
      {
        path: '/test1',
        name: 'test1',
        component: () => import(/* webpackChunkName: "about" */ '@/views/test1/Test1.vue'),
        meta: { title: '测试页面一' }
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import(/* webpackChunkName: "about" */ '@/views/test2/Test2.vue'),
        meta: { title: '测试页面二' }
      },
      {
        path: '/test3',
        name: 'test3',
        component: () => import(/* webpackChunkName: "about" */ '@/views/test3/Test3.vue'),
        meta: { title: '测试页面三' }
      },
      {
        path: '/test11',
        name: 'test11',
        component: () => import(/* webpackChunkName: "about" */ '@/views/test11/Test11.vue'),
        meta: { title: '测试页面一一' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
