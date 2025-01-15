<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import mainNavMenu from '@/components/menu.vue';
import mainHeader from '@/components/header.vue';
import { ref } from 'vue';

const collapse = ref<boolean>(true); // 是否展开显示 menu 左侧导航栏（展开或收缩）
const upCollapse = () => collapse.value = !collapse.value // 修改 collapses

</script>

<template>
    <el-container class="container">
        <el-aside class="nav-menu text-no-select" width="fit-content">
            <mainNavMenu :collapse="collapse"></mainNavMenu>
        </el-aside>
        <el-container>
            <el-header class="header">
                <mainHeader :collapse="collapse" :upCollapse="upCollapse"></mainHeader>
            </el-header>

            <el-main class="content">
                <div class="info">
                    <!-- 🔺Suspense: 主要用于解决当有异步组件时，出现的页面空白问题 <处理异步组件>
                            + 当页面/组件还未加载完成时，先展示 #fallback 插槽中的内容
                            + 当页面/组件加载完成时，再进行 router-view 的展示

                          🔺+ 当前项目中使用了异步组件的地方记录
                                1. menu.vue: 菜单管理页
                     -->
                    <Suspense>
                        <!-- 🔺ElConfigProvider: 用于全局配置 ElementPlus 国际化的设置 <zhCn:简体中文> -->
                        <keep-alive>
                            <ElConfigProvider :locale="zhCn">
                                <router-view></router-view>
                            </ElConfigProvider>
                        </keep-alive>

                        <template #fallback>
                            加载中....
                        </template>
                    </Suspense>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    position: fixed;

    .nav-menu {
        background-color: #001529;
        transition: all .5s;
    }

    .header {}

    .content {
        background-color: #f5f5f5;

        .info {
            background-color: white;
            border-radius: 5px;
        }
    }

}
</style>
