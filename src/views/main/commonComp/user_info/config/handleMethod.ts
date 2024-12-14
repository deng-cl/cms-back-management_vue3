import showMessage from "@/utils/showMessage";
import useUserInfoStore from "../store";
import { queryPut } from "@/service/main/main";
import rules, { RULE_TEST_FUN } from "@/global/form-rules";

const store = useUserInfoStore()

export async function editorPopupComfirm() {
    const userInfo = store.userInfo

    try { // 注册参数信息校验: 该 try catch 主要用户捕获用于终止 forEach 循环而抛出的异常 --> 避免多次执行 showMessage.default
        Object.keys(userInfo).forEach(key => {
            if (!userInfo[key] && key !== 'shop_name' && key !== 'id_card') { // 店铺名称 + 身份证 --> 可选
                showMessage.default("注册信息不完整，请补全信息!")
                throw new Error()
            }
        })

        // 校验表单数据合法性
        if (!RULE_TEST_FUN(rules.username, userInfo.username) || !RULE_TEST_FUN(rules.name, userInfo.name) || !RULE_TEST_FUN(rules.phone, userInfo.phone) || !RULE_TEST_FUN(rules.nickname, userInfo.nickname) || !RULE_TEST_FUN(rules.age, userInfo.age)) return // 当表单数据验证不通过时 --> 直接返回，执行新下面请求逻辑


        if (confirm("请再次确认修改用户基本信息!")) {
            await queryPut("/user/userinfo", userInfo) // 修改用户信息

            showMessage.success("以为您更新基本信息!")

            store.queryUserInfo() // 更新数据

            store.upHidePopupForm() // 隐藏 popup 修改信息表单
        }

    } catch (e) {
        console.log();
    }

}
