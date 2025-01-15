<script setup lang="ts">
import { Promotion, UserFilled } from '@element-plus/icons-vue'
import loginAccount from './account.vue';
import loginPhone from './phone.vue';

</script>

<template>
    <div class="login-panel">
        <h1 class="title">电子产品后台管理系统</h1>
        <el-tabs type="border-card" class="demo-tabs" stretch>
            <el-tab-pane>
                <template #label>
                    <span class="custom-tabs-label">
                        <el-icon color="#409EFC" class="no-inherit">
                            <UserFilled />
                        </el-icon>
                        <span>账号登录</span>
                    </span>
                </template>
                <!-- 账号登录 -->
                <loginAccount></loginAccount>
            </el-tab-pane>
            <el-tab-pane disabled>
                <template #label>
                    <span class="custom-tabs-label">
                        <el-icon color="#409EFC" class="no-inherit">
                            <Promotion />
                        </el-icon>
                        <span>手机登录</span>
                    </span>
                </template>
                <!-- 手机登录 -->
                <loginPhone></loginPhone>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
.title {
    /* color: #409eff; */
    color: white;
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 36px;
    font-family: 'Courier New', Courier, monospace;
}

.login-panel {
    min-width: 375px;
    max-width: 580px;
    width: 24vw;
    text-align: center;
    /* margin-right: 12vw; */
    margin-bottom: 80px;
}
</style>


<style>
/* element-plus component style */
.demo-tabs {
    /* border-color: #47b2e44a; */
    /* box-shadow: 0 1px 10px 1px #c9eeff78; */
    border-color: white;
    border-radius: 6px;
    overflow: hidden;
}

.custom-tabs-label {
    color: var(--el-color-primary);
    border: none;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}

.el-tabs--border-card>.el-tabs__content {
    padding: 20px 15px;
}
</style>
