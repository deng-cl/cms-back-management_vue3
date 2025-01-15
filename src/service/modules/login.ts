import type { AccountRuleForm, LoginResType, MenuData, MenuListType, MenuResType } from "@/views/login/config/types";
import hRequest from "..";
import showMessage from "@/utils/showMessage";

export const submitLogin: (payload: AccountRuleForm) => Promise<LoginResType | false> = async (payload) => {
    const result: LoginResType = await hRequest.post({
        url: '/login',
        data: {
            username: payload.name,
            password: payload.pass
        }
    })

    if (result.state === 200) {
        showMessage.success(result.msg) // 登录成功提示
        return result
    } else {
        showMessage.error(result.msg) // 登录失败提示
        return false
    }
}

export const getMenuList: () => Promise<MenuData[]> = async () => {
    const result: MenuResType = await hRequest.get({
        url: '/user/get/menu'
    })

    const menu_list = result.data

    if (result.state === 200) {
        showMessage.success(result.msg) // 登录成功提示
    } else {
        showMessage.error(result.msg + "菜单请求失败") // 登录失败提示
    }

    return menu_list
}


