import { reactive } from 'vue'
import type { FormRules } from 'element-plus'
import type { AccountRuleForm } from './types'

export const rules = reactive<FormRules<AccountRuleForm>>({
    name: [
        { required: true, message: 'Please input Activity zone', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_-]{5,11}$/, message: 'Length should be 5 to 11 <en | number>', trigger: 'blur' },
    ],
    pass: [
        { required: true, message: 'Please select Activity zone', trigger: 'blur', },
        { pattern: /^[a-zA-Z0-9_-]{6,}$/, message: 'The required length should be at least 6', trigger: 'blur' },
    ]
})
