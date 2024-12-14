import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"
import loginRoutes from "./login/login";
import mainRoutes from "./main/main";
import { beforeEach } from "./nav_protect/nav_protect";


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: "/not_found",
        component: () => import("@/views/not_found/not_found.vue"),
    },
    ...loginRoutes, // login page routes registory
    ...mainRoutes, // main page routes registory
]

const router = createRouter({ // create toutes instance
    history: createWebHashHistory(),
    routes
})

beforeEach(router) // 路由前置守卫 hook <抽取>

export default router
