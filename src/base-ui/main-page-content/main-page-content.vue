<script setup lang="ts">
import { EditPen, Delete, Plus } from '@element-plus/icons-vue'
import hTable, { type TableEventType, type PaginationConfig, type SelectEnable } from '../h-table/h-table.vue';

export interface DefaultHeaderHandleConfig { // 表格头部右侧类型
    name?: string // 按钮名称
    icon?: any // 图标
    click?: () => any | void // 按钮事件处理
}

export interface HandleColumnEventType {
    editorClickEvent: (rowData: any) => any
    deleteClickEvent: (rowData: any) => any
}

const props = withDefaults(
    // eslint-disable-next-line vue/valid-define-props
    defineProps<{
        title?: string
        tableConfig: any
        tableData: any
        paginationConfig: PaginationConfig | undefined // 分页配置项
        handleButtonConfig?: DefaultHeaderHandleConfig
        showHeaderHandle?: boolean
        tableEvents?: Partial<TableEventType> // 针对 showSelectColumn 为 true 选中时对应的事件
        selectEnable?: SelectEnable, // 用于决定可选框是否为禁用状态
        handleColumnEvent?: HandleColumnEventType
        ortherTableConfig?: any,
        showIndexColumn?: boolean
        showSelectColumn?: boolean
    }>(),
    {
        tableConfig: () => [],
        tableData: () => [],
        title: 'Table Default Title <custom:通过prop传递title属性进行定义>',
        paginationConfig: undefined,
        showIndexColumn: true,
        showSelectColumn: true,
    }
)

const othreSlot: any = props.tableConfig.filter((item: any) => { // 动态插槽属性 --> 过滤掉下面已经定义好的动态插槽
    if (item.prop === "enable") return false
    if (item.prop === "createAt") return false
    if (item.prop === "updateAt") return false
    if (item.prop === "handle") return false
    if (item.prop === "header-handle") return false
    return true
})

console.log(othreSlot);


</script>

<template>
    <hTable :title="title" :tableConfig="tableConfig" :tableData="tableData" :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn" :paginationConfig="paginationConfig" :tableEvents="tableEvents"
        :selectEnable="selectEnable" :ortherTableConfig="ortherTableConfig">
        <!--
            常用动态插槽样式定义
         -->
        <template #enable="scope">
            <slot name="enable" :row="scope.row">
                <el-button style="cursor: auto" :type="scope.row.enable === 'true' ? 'success' : 'danger'" size="small"
                    plain>{{
        scope.row.enable ===
            'true' ?
            '启用'
            : '禁用' }}</el-button>
            </slot>
        </template>

        <template #createAt="scope">
            <slot name="createAt" :row="scope.row">
                {{ $filters.formatUTCString(scope.row.createAt, "YYYY-MM-DD") }}
            </slot>
        </template>
        <template #updateAt="scope">
            <slot name="updateAt" :row="scope.row">
                {{ $filters.formatUTCString(scope.row.updateAt, "YYYY-MM-DD") }}
            </slot>
        </template>

        <template #handle="scope">
            <div class="handle-column">
                <!-- 默认操作栏: 可通过 handle-column 插槽进行自定义 -->
                <slot name="handle-column" :row="scope.row">
                    <el-button size="small" type="primary" link :icon="EditPen"
                        @click="handleColumnEvent?.editorClickEvent(scope.row)">编辑</el-button>
                    <el-button size="small" type="primary" link :icon="Delete"
                        @click="handleColumnEvent?.deleteClickEvent(scope.row)">删除</el-button>
                </slot>
            </div>
        </template>

        <template #header-handle>
            <slot name="header-handle">
                <el-button type="primary" :icon="handleButtonConfig?.icon ?? Plus" @click="handleButtonConfig?.click">{{
        handleButtonConfig?.name ??
        '新建用户' }}</el-button>
            </slot>
        </template>

        <!--
            其它自定义插槽定义
         -->
        <template v-for="item in othreSlot" :key="item.prop" #[item.prop]="scope">
            <slot :name="item.prop" :row="scope.row">
                {{ scope.row[item.prop] }}
            </slot>
        </template>
    </hTable>
</template>

<style scoped lang="scss">
.handle-column {
    flex-wrap: nowrap;
    display: flex;
    justify-content: center;

    button {
        padding: 0;
    }
}
</style>
