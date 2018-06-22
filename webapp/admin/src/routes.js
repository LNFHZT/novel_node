let routes = [{
        path: '/login',
        component: resolve => require(['@/views/Login.vue'], resolve),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: resolve => require(['@/views/404.vue'], resolve),
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        name: '用户管理',
        component: resolve => require(['@/views/Home.vue'], resolve),
        iconCls: 'fa fa-user-circle-o', //图标样式class
        children: [{
            path: '/user/list',
            component: resolve => require(['@/views/user/list.vue'], resolve),
            name: '用户列表',
        }]
    },
    {
        path: '/',
        name: '用户管理',
        leaf: true,
        component: resolve => require(['@/views/Home.vue'], resolve),
        iconCls: 'fa fa-user-circle-o', //图标样式class
        children: [{
            path: '/user/list',
            component: resolve => require(['@/views/user/list.vue'], resolve),
            name: '用户列表',
        }]
    },
    {
        path: '/',
        name: '权限管理',
        component: resolve => require(['@/views/Home.vue'], resolve),
        iconCls: 'fa fa-user-circle-o', //图标样式class
        children: [{
            path: '/power/user',
            component: resolve => require(['@/views/power/user.vue'], resolve),
            name: '权限人员管理',
        }, {
            path: '/power/pages',
            component: resolve => require(['@/views/power/pages.vue'], resolve),
            name: '权限页面',
        }]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;