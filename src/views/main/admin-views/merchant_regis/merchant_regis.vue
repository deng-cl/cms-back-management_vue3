<script setup lang="ts">
import mainPageSearch from '@/base-ui/main/h-searchbar.vue';
import mainPageContent from '@/base-ui/main/h-content.vue';

import useFormConfig from './config/useFormConfig';
import useTableConfig from './config/useTableConfig';

const { formOptions, search, reset, } = useFormConfig() // 获取 form 配置项 hook
const { tableConfig, paginationConfig, payload, queryList, tableData, tableEvents, selectedList } = useTableConfig() // 获取 table 配置项 hook

queryList(payload) // 初始数据请求

import { selectEnable, /* 注册单个或多个用户 */  registerMerchaantUserList, /* 注册单个用户 */ registerMerchaantUser } from './config/handleMethod' // 获取 registerMerchaantUserList 注册用户处理方法 --> 给下面的 #header-handle 插槽 buttoon 进行事件的监听 registerMerchaantUserList(selectedList:any[]) {}

</script>

<template>
    <div class="merchant_register">
        <mainPageSearch :form-options="formOptions" :form-data="payload" :search="search" :reset="reset">
        </mainPageSearch>

        <mainPageContent title="商家用户注册申请列表" :table-config="tableConfig" :pagination-config="paginationConfig"
            :table-data="tableData" :tableEvents="tableEvents" :selectEnable="selectEnable">
            <template #enable="scope">
                <el-button style="cursor: auto" :type="scope.row.state === 'true' ? 'success' : 'danger'" size="small"
                    plain>{{
            scope.row.state === 'true' ?
                '已注册'
                : '待处理' }}</el-button>
            </template>

            <template #handle-column="scope">
                <el-button :type="scope.row.state === 'true' ? 'info' : 'primary'" size="small" plain
                    :disabled="scope.row.state === 'true'" @click="registerMerchaantUser(scope.row)">通过</el-button>
            </template>

            <template #header-handle>
                <el-button type="primary" @click="registerMerchaantUserList(selectedList as any[])">批量通过</el-button>
            </template>
        </mainPageContent>
    </div>
</template>

<style scoped></style>
