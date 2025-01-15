import useLoginStore from '@/store/modules/login'
import localCache from '@/utils/cache'
import type { AccountRuleForm } from '../config/types'

const loginStore = useLoginStore()
export const handleLogin = (ruleForm: AccountRuleForm) => {
    /* account 登录逻辑 */
    useSavePassword(loginStore.isSavePass, ruleForm.name, ruleForm.pass) // -- 处理是否需要记住密码部分

    loginStore.submitAccountLogin({
        /* 登录逻辑 <在 loginStore 中处理> */ name: ruleForm.name,
        pass: ruleForm.pass
    })
}

function useSavePassword(isSave: boolean, username: string, password: string) {
    // -- 处理是否需要记住密码
    if (isSave) {
        // isSavePass:true --> 记住密码
        localCache.setCache('name', username)
        localCache.setCache('pass', password)
    } else {
        // isSavePass:true --> 无需记住密码 --> 清除缓存，避免前面已经有缓存
        localCache.deleteCache('name')
        localCache.deleteCache('pass')
    }
}
