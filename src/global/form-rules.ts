import { reactive } from 'vue'
import type { FormItemRule } from 'element-plus'
import showMessage from '@/utils/showMessage'


/***
    { required: true, message: 'Please input Activity zone', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]{6,11}$/, message: 'Length should be 6 to 11 <en | number>', trigger: 'blur' },
 */


export const RULE_TEST_FUN: (rule_info: any, value: any) => boolean = (rule_info: any, value: any) => {
    console.log(value, 444)
    if (!rule_info.pattern.test(value)) {
        showMessage.error(rule_info.message as string) // 给用户提示
        return false
    } else {
        return true
    }
}

interface Rules {
    [key: string]: FormItemRule
}

export const rules: Rules = {
    // tag
    'tag_name': { required: true, message: '标签名的长度应在 2-12 个字符', pattern: /^.{2,12}$/ },
    'tag_msg': { required: true, message: '标签名的长度应在 2-50 个字符', pattern: /^.{2,50}$/ },

    // merchant user
    'username': { required: true, pattern: /^[a-zA-Z0-9_-]{5,11}$/, message: 'Length should be 5 to 11 <en | number>', trigger: 'blur' },
    'password': { required: true, pattern: /^[a-zA-Z0-9_-]{6,}$/, message: 'The required length should be at least 6', trigger: 'blur' },
    'name': { required: true, message: '姓名的长度应在 2-15 个字符', pattern: /^.{2,15}$/, trigger: 'blur' },
    'phone': { required: true, message: '请输入合法的手机号', pattern: /^1[3-9]\d{9}$/, trigger: 'blur' },
    'id_card': { required: true, message: '请输入合法的身份证信息', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9xX]$/, trigger: 'blur' },
    'nickname': { required: true, message: '昵称的长度应在 2-15 个字符', pattern: /^.{2,15}$/, trigger: 'blur' },
    'age': { required: true, message: '请输入有效的符合注册要求的年龄 <0-120>', pattern: /^(?:[1-9]\d?|0|1[01]\d|120)$/, trigger: 'blur' },
    'shop_name': { required: true, message: '店铺名称的长度应在 4-15 个字符', pattern: /^.{2,15}$/, trigger: 'blur' },

    // shop_info
    'product_name': { required: true, message: '商品名称的长度应在 4-30 个字符', pattern: /^.{4,30}$/, trigger: 'blur' },
    'product_desc': { required: true, message: '商品描述的长度应在 4-200 个字符', pattern: /^.{4,200}$/, trigger: 'blur' },
    'product_discount': { required: true, message: '商品折扣应在 0-1 <如 .5 = 五折>', pattern: /^(0(\.\d+)?|1(\.0+)?)$/, trigger: 'blur' },
    'product_price': { required: true, message: 'Please input Activity zone', trigger: 'blur' },
    'product_count': { required: true, message: 'Please input Activity zone', trigger: 'blur' },
}

export default rules

