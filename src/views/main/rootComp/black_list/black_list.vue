<script setup lang="ts">
import mainPageSearch from "@/base-ui/main--page-search/main-page-search.vue";
import mainPageContent from "@/base-ui/main-page-content/main-page-content.vue";
import mainPagePopup from '@/base-ui/main-page-popup/main-page-popup.vue';


import useTableConfig from './config/useTableConfig';
// import useFormConfig from './config/useFormConfig';

// import usePopupConfig from "./config/usePopupConfig";
// import { upUserEnableInFalse, upUserEnableInTrue } from "./config/handleMethod";


// const { formOptions, search, reset, } = useFormConfig() // 获取 form 配置项 hook
const { tableConfig, paginationConfig, queryList, tableData } = useTableConfig() // 获取 table 配置项 hook


console.log(tableData);

queryList({}) // 初始数据请求

</script>

<template>
    <div class="user">
        <mainPageContent title="黑名单用户" :table-config="tableConfig" :table-data="tableData"
            :pagination-config="paginationConfig" :show-select-column="false">
            <template #header-handle>
                <span class="empty"></span>
            </template>
        </mainPageContent>
    </div>
</template>

<style scoped lang="scss">
:has(> .popup):after {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    background-color: #7f777742;
    z-index: 6;
}

.h-flex-center {
    flex-wrap: nowrap;

    button {
        padding: 0;
    }
}
</style>
