/**
 * 子路由模式 用于区分模块  
 */
export default [
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/home/index.vue'),
        meta: { title: '系统首页', icon: "el-icon-s-home", nav: true },
        children: [],
    },
    {
        path: '/user/center',
        name: 'userCenter',
        meta: { title: '用户管理', icon: "el-icon-s-platform", nav: true },
        children: [
            {
                path: '/list',
                name: 'userCenterList',
                component: () => import('@/views/user_center/index.vue'),
                meta: { title: '用户列表', nav: true },
                children: [
                    {
                        path: '/edit/:id',
                        name: 'userCenterListEdit',
                        component: () => import(/* webpackChunkName: "about" */ '@/views/user_center/list_edit.vue'),
                        meta: { title: '用户详情', nav: false }
                    },
                ]
            },

        ],
    },
    {
        path: '/book/center',
        name: 'bookCenter',
        meta: { title: '书籍管理', icon: "el-icon-s-platform", nav: true },
        children: [
            {
                path: '/list',
                name: 'bookCenterList',
                component: () => import('@/views/book_center/index.vue'),
                meta: { title: '书籍列表', nav: true },
                children: [

                ]
            },
            {
                path: '/examine',
                name: 'bookCenterExamine',
                component: () => import('@/views/book_center/examine.vue'),
                meta: { title: '书籍审核', nav: true },
            }
        ]
    },
    {
        path: '/page/center',
        name: 'pageCenter',
        meta: { title: '页面管理', icon: "el-icon-s-platform", nav: true },
        children: [
            {
                path: '/list',
                name: 'pageCenterList',
                component: () => import('@/views/user_center/index.vue'),
                meta: { title: '微页面列表', nav: true },
            },
            {
                path: '/advert',
                name: 'pageCenterAdvert',
                component: () => import('@/views/user_center/index.vue'),
                meta: { title: '广告', nav: true },
            },
            {
                path: '/banner',
                name: 'pageCenterBanner',
                component: () => import('@/views/user_center/index.vue'),
                meta: { title: '轮播', nav: true },
            }
        ]
    },
    {
        path: '/safety/monitoring',
        name: 'safetyMonitoring',
        meta: { title: '安全监控', icon: "el-icon-s-platform", nav: true },
        children: [

        ]
    },
    {
        path: '/finance/center',
        name: 'financeCenter',
        meta: { title: '财务管理', icon: "el-icon-s-platform", nav: true },
        children: [

        ]
    },
    {
        path: '/sys/center',
        name: 'sysCenter',
        meta: { title: '系统管理', icon: "el-icon-s-platform", nav: true },
        children: [

        ]
    }

]