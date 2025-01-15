<script setup lang="ts">
import useLoginStore from '@/store/modules/login';
const loginStore = useLoginStore()

</script>

<template>
    <div class="nav-breadcrumb">
        <el-breadcrumb :separator="''">
            <template v-for="(item, i) in loginStore.breadcrumb" :key="i">
                <el-breadcrumb-item :to="{ path: item.path }">{{ item.title
                    }}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<style scoped lang="scss">
.nav-breadcrumb {}
</style>
