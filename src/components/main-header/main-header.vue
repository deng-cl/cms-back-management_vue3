<script setup lang="ts">
import { useRouter } from 'vue-router'
import breadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import useLoginStore from '@/store/login/login';
import localCache from '@/utils/cache';
import { Expand, Fold, Plus, SwitchButton } from '@element-plus/icons-vue'; /* 局部引入某一图标组件 */
import { computed } from 'vue';
import showMessage from '@/utils/showMessage';

defineProps<{ // 通过 defineProps 宏，进行父组件属性传递的拦截 --> 通过 ts 泛型的方式定义
    collapse: Boolean,
    upCollapse: () => void
}>()

const loginStore = useLoginStore() // login pinia -- userinfo

// ------ exit login
const router = useRouter()
const exitLogin = () => { // 退出登录
    if (!confirm(`确定退出 ${loginStore.username} 用户登录`)) return
    localCache.deleteCache("token") // 删除本地 token 缓存
    // localCache.deleteCache("menuList") // 删除本地 token 缓存
    router.replace('/login') // 通过编程式路由导航，将页面跳转至 login 页面页面中
    showMessage.success("已退出登录")
}

const avatarSrc = computed(() => { // 获取用户头像地址
    if (!loginStore.avatarInfo?.avatar_url) return false

    return import.meta.env.VITE_APP_BASE_URL + loginStore.avatarInfo?.avatar_url
})

</script>

<template>
    <div class="header">
        <!-- icon -->
        <el-icon class="icon" @click="upCollapse">
            <Expand v-if="collapse"></Expand>
            <Fold v-else></Fold>
        </el-icon>
        <div class="content">
            <breadcrumb></breadcrumb>
            <div class="user">

                <el-dropdown trigger="click">
                    <el-avatar shape="square" :size="22" class="avatar"
                        :src="avatarSrc ? avatarSrc : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />

                    <span class="el-dropdown-link">
                        {{ loginStore.username }}
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="SwitchButton" @click="exitLogin">退出登录</el-dropdown-item>
                            <el-dropdown-item :icon="Plus">Action 2</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;

    .icon {
        margin-right: 10px;
        font-size: 20px;
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user {

            .avatar {
                margin-right: 6px
            }
        }
    }
}
</style>

<style>
.el-dropdown {
    line-height: 22px;
    color: #000000;
}
</style>
