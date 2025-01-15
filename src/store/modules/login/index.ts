import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import localCache from '@/utils/cache'
import { getMenuList, submitLogin } from '@/service/modules/login' // 发送登录请求
import type { AccountRuleForm } from '@/views/login/config/types'
import { useRouter } from 'vue-router'
import { getBreadcrumbDate, getButtonPermissionAllByMenu, handleMenuDataList } from '@/utils/mapMenu'
import type { LoginStoreType, MenuListType } from './types'
import { queryGet } from '@/service/modules/main'

/* ------------------------------------------ ↓代码逻辑区 ------------------------------------------ */
const useLoginStore = defineStore('login', (): LoginStoreType => {
    const isSavePass = ref<boolean>(false)
    watch(isSavePass, (n) => {
        localCache.setCache('isSavePass', n) /* 是否记住密码选项持久化处理 */
    })

    const token = ref<string>('')
    const userId = ref<number>(0)
    const user_type_id = ref<any>(0)
    const username = ref<string>('username')
    const menuList: Ref<MenuListType[] | null | undefined> = ref()
    const router = useRouter()
    const breadcrumb = ref<any[]>([])
    const formatedMenuList = ref()
    const buttonPermission = ref()
    const avatarInfo: any = ref()
    const submitAccountLogin = async (payload: AccountRuleForm) => {
        /* Account 登录请求等逻辑 */
        const result = await submitLogin(payload) // 服务器返回的数据
        /* 保存 token 信息 */
        if (result) {
            // 登录请求成功 -- 有值的情况下
            token.value = result.token
            userId.value = result.id
            user_type_id.value = result.user_type_id
            username.value = result.username

            localCache.setCache('token', token.value) // 本地缓存 token 信息
            localCache.setCache('userId', userId.value) // 本地缓存 userId 信息
            localCache.setCache('user_type_id', user_type_id.value) // 本地缓存 user_type_id 信息
            localCache.setCache('username', username.value) // 本地缓存 username 信息

            // 登录成功后，获取对应的功能菜单 -- menu
            const menu_data = await getMenuList()
            menuList.value = menu_data as any
            localCache.setCache('menuList', menuList.value) // 功能菜单列表数据持久化

            // formatedMenuList 格式化 MenuList 数据
            formatedMenuList.value = handleMenuDataList(menuList.value as any)
            localCache.setCache('formatedMenuList', formatedMenuList.value) // 格式化功能菜单列表数据持久化

            // buttonPermission 获取用户所有 Button 按钮权限
            buttonPermission.value = getButtonPermissionAllByMenu(formatedMenuList.value)
            localCache.setCache('buttonPermission', buttonPermission.value) // 格式化功能菜单列表数据持久化

            // 登录成功 --> 跳转至首页 main.vue
            router.push({
                path: '/main'
            })

            // 登录成功 --> 获取用户头像信息
            avatarInfo.value = (await queryGet('/user/avatar', {})).data
            localCache.setCache('avatarInfo', avatarInfo.value) // 用户头像信息数据持久化
        }
    }

    const submitPhoneLogin = (payload: any) => {
        /* Phone 登录请求等逻辑 */
        console.log('执行 submitPhoneLogin --> ', payload)
    }

    const upBreadcrumb = (path: string) => [
        /* 更新 breadcrumb 面包屑数据 */ (breadcrumb.value = getBreadcrumbDate(path))
    ]

    return {
        isSavePass,
        token,
        username,
        userId,
        user_type_id,
        menuList,
        breadcrumb,
        formatedMenuList,
        buttonPermission,
        submitAccountLogin,
        submitPhoneLogin,
        upBreadcrumb,
        avatarInfo
    }
})

export default useLoginStore
