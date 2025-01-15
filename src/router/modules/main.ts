const mainRoutes = [
    {
        path: '/main',
        component: () => import('@/views/main/main.vue'),
        children: [
            // redirect
            {
                path: '/main',
                redirect: '/system_overview'
            },

            // common --data_overview - common-views
            {
                path: '/system_overview',
                component: () => import('@/views/main/common-views/system_overview/system_overview.vue')
            },
            {
                path: '/shop_info/:user_type_id', // type: root | merchant --> 根据 user_type_id 进行判断 | 查询字符串参数
                component: () => import('@/views/main/common-views/shop_info/shop_info.vue')
            },
            {
                path: '/user_info',
                component: () => import('@/views/main/common-views/user_info/user_info.vue')
            },

            // root - admin-views
            {
                path: '/menu',
                component: () => import('@/views/main/admin-views/menu/menu.vue')
            },
            {
                path: '/merchant_regis',
                component: () => import('@/views/main/admin-views/merchant_regis/merchant_regis.vue')
            },
            {
                path: '/tag_comfig',
                component: () => import('@/views/main/admin-views/tag_comfig/tag_comfig.vue')
            },
            {
                path: '/merchant_user', // merchant user
                component: () => import('@/views/main/admin-views/merchant_user/merchant_user.vue')
            },
            {
                path: '/normal_user', // normal user
                component: () => import('@/views/main/admin-views/normal_user/normal_user.vue')
            },
            {
                path: '/black_list',
                component: () => import('@/views/main/admin-views/black_list/black_list.vue')
            },
            {
                path: '/data_overview',
                component: () => import('@/views/main/admin-views/data_overview/data_overview.vue')
            },
            
            // merchant
            {
                path: '/order', // 未完成/待处理
                component: () => import('@/views/main/merchant-views/order/index.vue')
            },
            {
                path: '/shop_overview',
                component: () => import('@/views/main/merchant-views/shop_overview/shop_overview.vue')
            }
        ]
    }
]

export default mainRoutes
