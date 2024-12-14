<script setup lang="ts">
import useNormalUser from '@/views/main/rootComp/normal_user/store';
import { ref, type Ref } from 'vue'

export interface TableEventType { // 其它事件类型，需要使用到时再到 element-plus 中查看对应的事件....
    selectionChange: (newSelection: any[]) => void
}

interface PaginationPropConfig {
    total: number // 列表数据总数
    size: number // 一页显示的数据量
    currentPage: number // 当前页
}

interface PaginationEventConfig {
    currentChange: (pageCount: any, payload: any) => void // 监听当前页事件 <分页跳转事件> --> payload 参数: 模糊查询参数
    sizeChange: (size: any) => void // 监听选择一页展示多少数据事件 <单页展示数据量>
}

export interface PaginationConfig { // 分页组件配置选项
    prop: PaginationPropConfig
    event: PaginationEventConfig
}
export type SelectEnable = (row: any, rowIndex: any) => boolean

const props = withDefaults(
    defineProps<{
        title?: string // table 数据的标题
        tableConfig: any // 列表所要展示哪些关键字配置项
        tableData: any // 列表数据配置项
        paginationConfig?: PaginationConfig | undefined// 分页配置项
        showIndexColumn?: boolean // 是否显示序号列
        showSelectColumn?: boolean // 是否显示选中列（可选中）
        tableEvents?: Partial<TableEventType> // 针对 showSelectColumn 为 true 选中时对应的事件
        selectEnable?: SelectEnable, // 用于决定可选框是否为禁用状态
        ortherTableConfig?: any
    }>(),
    {
        showIndexColumn: false,
        showSelectColumn: false,
        title: "Table Default Title <custom:通过prop传递title属性进行定义>"
    }
)
</script>

<template>
    <div class="content">
        <!-- 头部 -->
        <div class="header">
            <div class="title">{{ title }}</div>
            <div class="handle">
                <slot name="header-handle">header-handle 插槽默认内容</slot>
            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" fit :header-cell-style="{ 'text-align': 'center' }"
            v-on="tableEvents" v-bind="ortherTableConfig">

            <el-table-column align="center" v-if="showSelectColumn" type="selection" width="60"
                :selectable="selectEnable"></el-table-column>
            <el-table-column v-if="showIndexColumn" type="index" align="center" label="序号" width="80"></el-table-column>

            <template v-for="(item, i) in tableConfig" :key="i">
                <el-table-column align="center" v-bind="item">
                    <template #default="scope">
                        <!-- 当有 prop 配置时，插槽名称默认使用 prop，没有 prop 时插槽名称使用 slotName 配置 -->
                        <slot :name="item.prop ? item.prop : item.slotName" :row="scope.row">
                            <!-- 默认展示原数据，可通过插槽来自定义 -->
                            {{ scope.row[item.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <template v-if="paginationConfig">
            <div class="demo-pagination-block">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[1, 2, 8, 10, 15, 30, 50]"
                    :v-model:current-page="paginationConfig.prop.currentPage"
                    :v-model:page-size="paginationConfig.prop.size" :default-page-size="paginationConfig.prop.size"
                    :total=" /* Number 避免该数据不是 number 类型，与解决 elemtn-plus 的警告提示 */ Number(paginationConfig.prop.total)"
                    @size-change="paginationConfig.event.sizeChange"
                    @current-change="paginationConfig.event.currentChange">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.content {
    border-top: 20px solid #f5f5f5;
    padding: 20px;

    .header {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .handle {
        display: flex
    }

    .demo-pagination-block {
        margin-top: 20px;
        display: flex;
        justify-content: right;
    }
}
</style>
