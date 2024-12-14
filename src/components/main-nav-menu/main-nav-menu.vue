<script setup lang="ts">
import localCache from '@/utils/cache';
import type { MenuListType } from '@/views/login/config/types';
import { ref, onMounted, computed } from "vue"
import { Menu, Monitor, User, Goods, UserFilled, ShoppingCartFull, Shop } from '@element-plus/icons-vue' /* 局部引入某一图标组件 */
import useLoginStore from '@/store/login/login';
import { useRoute } from 'vue-router';

defineProps<{ // 属性拦截
    collapse: boolean
}>()

// 面包屑 breadcrumb
const loginStore = useLoginStore()

const menuDate = ref<MenuListType[]>(loginStore.menuList as any) // 获取左侧导航栏 menu 的列表数据

onMounted(() => {
    loginStore.upBreadcrumb(useRoute().path.replace(/^\//, ''))
})

</script>

<template>
    <div class="nav-menu" :style="{ width: collapse ? '220px' : '64px' }">
        <div class="title">
            <img src="../../assets/imgs/vite-js-logo.svg">
            <span v-show="collapse">Vue3 + Ts</span>
        </div>

        <div class="menu_list">
            <el-menu class="el_menu" background-color="#3d4349" active-text-color="#ffffff" router :collapse="!collapse"
                :show-timeout="0" :hide-timeout="0">
                <el-sub-menu v-for="( menuData, index ) in menuDate" :key="menuData.id" :index="index" class="menu_sub">
                    <template #title>
                        <el-icon :class="menuData?.icon">
                            <template v-if="menuData?.icon === 'el-icon-monitor'">
                                <Monitor />
                            </template>
                            <template v-if="menuData?.icon === 'el-icon-user'">
                                <User />
                            </template>
                            <template v-if="menuData?.icon === 'el-icon-goods'">
                                <Goods />
                            </template>
                            <template v-if="menuData?.icon === 'el-icon-UserFilled'">
                                <UserFilled />
                            </template>

                            <template v-if="menuData?.icon === 'el-icon-ShoppingCartFull'">
                                <ShoppingCartFull />
                            </template>

                            <template v-if="menuData?.icon === 'el-icon-shop'">
                                <Shop />
                            </template>
                        </el-icon>
                        <span>{{ menuData.parent_title }}</span>
                    </template>
                    <el-menu-item-group>

                        <el-menu-item v-for="( child, i ) in menuData.children" :key="i" :index="'/' + child.path"
                            :class="'/' + child.path === $route.path ? 'is-active' : 'eee'"
                            @click="loginStore.upBreadcrumb(child.path)">{{
        child.title }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </div>
    </div>
</template>


<style scoped lang="scss">
.nav-menu {
    color: white;
    box-sizing: border-box;
    padding: 10px 0;
    position: relative;
    transition: all .5s;

    .title {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        position: absolute;
        padding-left: 20px;
        box-sizing: border-box;


        img {
            height: 30px;
        }

        span {
            margin-left: 10px;
            white-space: nowrap;

        }
    }

    .menu_list {
        margin-top: 50px;

        .el_menu {
            background-color: #001529;
            color: white;
        }
    }
}
</style>

<style lang="scss">
.el-menu {
    border: none;
}

.el-sub-menu__title {
    color: white;
}

.el-menu-item {
    color: #9aa5ae;
}

.el-menu-item-group__title {
    display: none;
}

.el-menu-item:hover {
    background-color: #00152942;
}

.el-menu-item.is-active {
    background-color: #0015296e;
    font-weight: 520;
}

.el-sub-menu__title:hover {
    background-color: #001529;
}
</style>
