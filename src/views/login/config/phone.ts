import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
import type { PhoneRuleForm } from './types'

export const rules = reactive<FormRules<PhoneRuleForm>>({
    phone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { pattern: /^[1]{1}[0-9]{10}$/, message: '手机格式错误，需要11位数字的手机号', trigger: 'blur' },
    ],
    veriCode: [
        { required: true, message: '验证码不能为空', trigger: 'blur', },
        { pattern: /^[0-9]{6}$/, message: '验证码格式错误，需要6位数字类型验证码', trigger: 'blur' },
    ]
})
