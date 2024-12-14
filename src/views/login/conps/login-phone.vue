<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

import type { FormInstance } from 'element-plus'
import { rules } from '../config/login-phone'

import useLoginStore from '@/store/login/login';  /* login pinia 状态管理 */
import { submitLogin } from '../hooks/usePhone';  /* 登录逻辑 hook */
import type { PhoneRuleForm } from '../config/types';

const ruleForm = reactive<PhoneRuleForm>({
    phone: '',
    veriCode: '',
})

const loginStore = useLoginStore()

const ruleFormRef = ref<FormInstance>() // 获取 el-form 实例

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) { // 提交表单成功格式校验成狗时
            submitLogin(ruleForm)
        } else {
            console.log("格式错误", fields);
        }
    })
}

</script>

<template>
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" status-icon>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" clearable />
        </el-form-item>

        <el-form-item label="验证码" prop="veriCode">
            <div class="flex">
                <el-input class="input" v-model="ruleForm.veriCode" placeholder="请输入6位验证码" clearable />
                <el-button type="primary" class="button" disabled>获取验证码</el-button>
            </div>
        </el-form-item>

        <div class="line" style="margin:  28px 0 12px 0; display: flex; align-items: center">
            <!-- 后面实现时可删该 small 标签内容 -->
            <small
                style="font-size: 12px; line-height: 10px; margin-right: 8px;color: rgb(186 179 179 / 82%);">暂未实现手机登录功能</small>
            <el-link type="primary" underline style="">无法接收到验证码!</el-link>
        </div>

        <el-button type="primary" class="but" @click="submitForm(ruleFormRef)" disabled>立即登录</el-button>
    </el-form>
</template>

<style scoped lang="scss">
.line {
    display: flex;
    justify-content: end;
    transform: translateY(-3px);
}

.but {
    width: 100%;
}

.flex {
    display: flex;


    .input {
        flex: 1
    }

    .button {
        padding: 10px auto;
        margin-left: 5px;
    }
}
</style>

<style>
.el-form-item {
    margin-bottom: 16px;
}
</style>@/store/login/login
