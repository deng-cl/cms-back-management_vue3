import type { Router } from 'vue-router'
import localCache from '@/utils/cache'

const setBeforeEach = (router: Router) => {
    router.beforeEach((to, from) => {
        // 路由拦截，判断是否为登录状态
        if (localCache.getCache('token')) {
            // 判断是否已登陆 --> 已登陆
            if (to.path === '/login') {
                return '/main'
            } else {
                return true
            }
        } else {
            return to.path === '/login' ? true : '/login'
        }
    })

    router.beforeEach((to, from) => {
        if (localCache.getCache('token')) {
            // 判断是否已登陆 --> 已登陆
            const MENU_LIST = localCache.getCache('menuList') // 获取本地存储中的 Menu 菜单列表信息

            const MENU_PATHS = getAllMenuListPathInfo(MENU_LIST) // 遍历处 MENU_LIST 中的所有 path 信息

            if (!MENU_PATHS.includes(to.path.split(/^\//)[1]) && to.path !== '/not_found') {
                // 判断该用户是否有访问将要去的路由的权限: 当前用户没有权限或不存在对应路由页面时，返回 404 页面 <not_found> : 🔺添加 "to.path !== '/not_found'" 判断条件，避免出现无限重定向
                return '/not_found'
            } else {
                return true
            }
        } else {
            return to.path === '/login' ? true : '/login'
        }
    })
}

function getAllMenuListPathInfo(menuList: any[]) {
    // 查找所有 navbar 菜单导航栏的 path 路径 --> 用于方便路由守卫检查该用户是否有对应路由的访问权限 --> <页面权限>
    const MENU_PATH_LIST: any[] = []

    menuList.forEach((menuItem) => {
        // 循环遍历 Menu 列表，将里面的 path 路径存储至 MENU_PATH_LIST 中
        menuItem.children.forEach((menuInfo: any) => {
            MENU_PATH_LIST.push(menuInfo?.path)
        })
    })

    return MENU_PATH_LIST // 放回该用户类型的所有路径类型
}

export { setBeforeEach }
