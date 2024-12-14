<script setup lang="ts">
import useTableConfig from './config/useTableConfig';
import mainPageContent from '@/base-ui/main-page-content/main-page-content.vue';

const { tableConfig, tableData } = await useTableConfig()

</script>

<template>
    <div class="menu">
        <mainPageContent title="菜单列表" :table-config="tableConfig" :table-data="tableData" :show-index-column="false"
            :show-select-column="false"
            :ortherTableConfig="{ rowKey: 'title', lazy: true, treeProps: { children: 'children' } }">
            <template #header-handle><span></span></template>
        </mainPageContent>
    </div>
</template>

<style scoped></style>
