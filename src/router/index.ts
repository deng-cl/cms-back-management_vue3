import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import loginRoutes from './modules/login'
import mainRoutes from './modules/main'
import { setBeforeEach } from './handler/index'

// -- merge routes
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    ...loginRoutes,
    ...mainRoutes,
    {
        path: '/not_found',
        component: () => import('@/views/notfound/index.vue')
    }
]

// create routes instance and set routes
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// set beforeEach handler
setBeforeEach(router)

export default router
