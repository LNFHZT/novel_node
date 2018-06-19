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
        name: '权限管理',
        component: resolve => require(['@/views/Home.vue'], resolve),
        iconCls: 'fa fa-user-circle-o', //图标样式class
        children: [{
            path: '/power/user',
            component: resolve => require(['@/views/power/user.vue'], resolve),
            name: '权限管理',
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
    // {
    //     path: '/',
    //     name: '导航一',
    //     component: resolve => require(['@/views/Home.vue'], resolve),
    //     iconCls: 'el-icon-message', //图标样式class
    //     children: [{
    //             path: '/main',
    //             component: resolve => require(['@/views/Main.vue'], resolve),
    //             name: '主页',
    //             hidden: true
    //         },
    //         {
    //             path: '/table',
    //             component: resolve => require(['@/views/nav1/Table.vue'], resolve),
    //             name: 'Table'
    //         },
    //         {
    //             path: '/form',
    //             component: resolve => require(['@/views/nav1/Form.vue'], resolve),
    //             name: 'Form'
    //         },
    //         {
    //             path: '/user',
    //             component: resolve => require(['@/views/nav1/user.vue'], resolve),
    //             name: '列表'
    //         },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: resolve => require(['@/views/Home.vue'], resolve),
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [{
    //             path: '/page4',
    //             component: resolve => require(['@/views/404.vue'], resolve),
    //             name: '页面4'
    //         },
    //         {
    //             path: '/page5',
    //             component: resolve => require(['@/views/404.vue'], resolve),
    //             name: '页面5'
    //         }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: resolve => require(['@/views/Home.vue'], resolve),
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true, //只有一个节点
    //     children: [{
    //         path: '/page6',
    //         component: resolve => require(['@/views/404.vue'], resolve),
    //         name: '导航三'
    //     }]
    // },
    // {
    //     path: '/',
    //     component: resolve => require(['@/views/404.vue'], resolve),
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [{
    //         path: '/echarts',
    //         component: resolve => require(['@/views/404.vue'], resolve),
    //         name: 'echarts'
    //     }]
    // },

];

export default routes;