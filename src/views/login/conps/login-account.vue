<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { rules } from '../config/login-account'
import type { AccountRuleForm } from "../config/types"

import useLoginStore from '@/store/login/login'; /* login pinia 状态管理 */
import localCache from '@/utils/cache'; /* 本地存储 utils */
import { handleLogin } from '../hooks/useAccount'; /* 登录逻辑 hook */

const ruleForm = reactive<AccountRuleForm>({
    name: localCache.getCache("name") === 'undefined' ? "" : localCache.getCache("name"),
    pass: localCache.getCache("pass") === 'undefined' ? "" : localCache.getCache("pass"),
})

const loginStore = useLoginStore() /* login pinia store */

loginStore.isSavePass = localCache.getCache("isSavePass") ?? false // 历史缓存中是否存在该属性

const ruleFormRef = ref<FormInstance>() // 获取 el-form 实例

const submitForm = (formEl: FormInstance | undefined) => { /* submit-login */
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) { // 提交表单成功格式校验成狗时
            handleLogin(ruleForm) /* 表单格式验证通过 --> 执行登录逻辑 */
        } else {
            console.log("格式错误", fields);
        }
    })
}

</script>

<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" status-icon>
        <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入账号/用户名" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" placeholder="请输入密码" show-password clearable />
        </el-form-item>

        <div class="line">
            <el-checkbox v-model="loginStore.isSavePass" label="记住密码" size="large" />
            <el-link type="primary" :underline="false">忘记密码</el-link>
        </div>

        <el-button type="primary" class="but" @click="submitForm(ruleFormRef)">立即登录</el-button>
    </el-form>
</template>

<style scoped>
.line {
    display: flex;
    justify-content: space-between;
    transform: translateY(-3px);
}

.but {
    width: 100%;
}
</style>
