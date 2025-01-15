<script setup lang="ts">
import mainPageSearch from '@/base-ui/main/h-searchbar.vue';
import mainPageContent from '@/base-ui/main/h-content.vue';
import mainPagePopup from '@/base-ui/main/h-popup.vue';

import useFormConfig from './config/useFormConfig' // 表单配置项 hook
import useTableConfig from './config/useTableConfig'; // 表格配置项 hook
import usePopupConfig from './config/usePopupConfig'; // 弹出popup表单配置项 hook
import { onMounted, onActivated } from 'vue';


/* 导出的直接就是 popup 的配置项，直接使用 */
const { formOptions, search, reset } = useFormConfig()

const { tableConfig, paginationConfig, payload, queryList, handleConfig, tableData, handleColumnEvnet } = useTableConfig()

queryList(payload) // 首次加载页面请求数据

const {
    popupTitle,
    showPopup,
    popupFormConfig,
    popupFooterConfig,
    popupFormData
} = usePopupConfig() // 获取 popupConfig 配置项

</script>

<template>
    <div class="tag_comfig">
        <mainPageSearch :form-options="formOptions" :form-data="payload" :search="search" :reset="reset">
        </mainPageSearch>

        <mainPageContent title="商品标签管理" :table-config="tableConfig" :pagination-config="paginationConfig"
            :table-data="tableData" :handle-button-config="handleConfig" :handle-column-event="handleColumnEvnet">
            <template #tag_name="scope">
                <el-tag type="primary">{{ scope.row.tag_name }}</el-tag>
            </template>
        </mainPageContent>

        <mainPagePopup v-if="showPopup" :popup-title="popupTitle" :popup-form-config="popupFormConfig"
            :popup-footer-config="popupFooterConfig" :popup-form-data="popupFormData"></mainPagePopup>
    </div>
</template>

<style scoped>
/* 包含 .popup 字类的元素，即找到 .popup 的父元素，未解决 z-index 问题 <如果直接在 mainPagePopup 定义该蒙层伪类，会造成该伪类的定位始终在顶层，就会造成无法操作弹出层> */
/* 因为 z-index 只有在同一层级下才会生效，所以需要找到 .popup 的父元素，在父元素中定义 :after 伪类 <避免 :after 层级永远高于 .popup>*/
:has(> .popup):after {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    background-color: #7f777742;
    z-index: 6;
}
</style>
