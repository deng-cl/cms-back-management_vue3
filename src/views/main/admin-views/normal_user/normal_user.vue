<script setup lang="ts">
import mainPageSearch from "@/base-ui/main/h-searchbar.vue";
import mainPageContent from "@/base-ui/main/h-content.vue";
import mainPagePopup from '@/base-ui/main/h-popup.vue';

import useFormConfig from './config/useFormConfig';
import useTableConfig from './config/useTableConfig';
import usePopupConfig from "./config/usePopupConfig";
import { upUserEnableInFalse, upUserEnableInTrue } from "./config/handleMethod";


const { formOptions, search, reset, } = useFormConfig() // 获取 form 配置项 hook
const { tableConfig, paginationConfig, payload, queryList, tableData, handleButtonConfig } = useTableConfig() // 获取 table 配置项 hook

queryList(payload) // 初始数据请求

const {
    popupTitle,
    showPopup,
    popupFormConfig,
    popupFooterConfig,
    popupFormData
} = usePopupConfig() // 获取 popupConfig 配置项

</script>

<template>
    <div class="user">
        <mainPageSearch :formOptions="formOptions" :formData="payload" :search="search" :reset="reset">
        </mainPageSearch>
        <mainPageContent title="用户列表" :tableConfig="tableConfig" :table-data="tableData"
            :paginationConfig="paginationConfig" :handle-button-config="handleButtonConfig">

            <template #handle-column="scope">
                <el-button size="small" type="danger" :disabled="scope.row.enable === 'false'"
                    @click="upUserEnableInFalse(scope.row)">禁用</el-button>
                <el-button size="small" type="primary" :disabled="scope.row.enable === 'true'"
                    @click="upUserEnableInTrue(scope.row)">启用</el-button>
            </template>
        </mainPageContent>

        <mainPagePopup v-if="showPopup" :popup-title="popupTitle" :popup-form-config="popupFormConfig"
            :popup-footer-config="popupFooterConfig" :popup-form-data="popupFormData"></mainPagePopup>
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
</style>
