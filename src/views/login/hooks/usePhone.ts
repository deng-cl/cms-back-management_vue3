import useLoginStore from '@/store/modules/login'
const loginStore = useLoginStore()

export const submitLogin = (ruleForm: any) => {
    /* account 登录逻辑 */
    loginStore.submitPhoneLogin({
        /* 登录逻辑 <在 loginStore 中处理> */ phone: ruleForm.phone,
        veriCode: ruleForm.veriCode
    })
}
