import showMessage from "@/utils/showMessage"
import useMerchantlUser from "../store"
import { queryPost, queryPut } from "@/service/main/main"
import useTableConfig from "./useTableConfig"
import rules, { RULE_TEST_FUN } from "@/global/form-rules"

const store = useMerchantlUser() // merchant store

const { queryList, payload } = useTableConfig()

export async function createPopupComfirm() {
    const formData = store.popupFormData // 获取对应的表单数据

    try { // 注册参数信息校验: 该 try catch 主要用户捕获用于终止 forEach 循环而抛出的异常 --> 避免多次执行 showMessage.default
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                showMessage.default("注册信息不完整，请补全信息!")
                throw new Error()
            }
        })

        // 验证表单数据的合法性
        if (!RULE_TEST_FUN(rules.username, formData.username) || !RULE_TEST_FUN(rules.password, formData.password) || !RULE_TEST_FUN(rules.name, formData.name) || !RULE_TEST_FUN(rules.phone, formData.phone) || !RULE_TEST_FUN(rules.id_card, formData.id_card) || !RULE_TEST_FUN(rules.nickname, formData.nickname) || !RULE_TEST_FUN(rules.age, formData.age) || !RULE_TEST_FUN(rules.shop_name, formData.shop_name)) return // 当表单数据验证不通过时 --> 直接返回，执行新下面请求逻辑

        // 当参数完整，即校验通过后 --> 才会执行到下面这些代码
        if (!confirm(`请再次确认注册 "${formData?.username}" 商家用户`)) throw new Error() // 跳出函数运行 --> confirm: false

        const result = await queryPost("/user/registry/merchant", { ...formData, isRoot: true }) // 用户注册请求

        if (result.state !== 200) return

        queryList(payload) // 用户信息注册成功，更新数据
        showMessage.success("注册成功")
        store.upHidePopupForm() // 关闭 popup 表单
    } catch (e) {
        console.log();
    }
}


export async function upUserEnableInFalse(rowData: any) { // 将用户的状态改为禁用状态
    const { id, username } = rowData // 获取用户 id 信息

    if (!confirm(`请再次确认将 "${username}" 用户修改为禁用状态!`)) return

    await queryPut("/user/merchant/up_enable", { // 修改用户状态 --> 禁用
        id,
        enable: "false"
    })

    showMessage.success("状态修改成功")
    queryList(payload) // 更新数据
}

export async function upUserEnableInTrue(rowData: any) { // 将用户的状态改为启用状态
    const { id, username } = rowData // 获取用户 id 信息

    if (!confirm(`请再次确认将 "${username}" 用户修改为启用状态!`)) return

    await queryPut("/user/merchant/up_enable", { // 修改用户状态 --> 启用
        id,
        enable: "true"
    })

    showMessage.success("状态修改成功")
    queryList(payload) // 更新数据
}

