import { computed, reactive, ref, type Ref } from 'vue'
import type { PaginationConfig, TableEventType } from "@/base-ui/h-table/h-table.vue"
import useTagStore, { formData } from '../store'
import type { UseTableConfig } from '@/views/main/config/types'

const store = useTagStore()

const useTableConfig: UseTableConfig = () => {
    const tableConfig = [ // 🔺el-table 表格配置项
        // 当有 prop 配置时，插槽名称默认使用 prop，没有 prop 时插槽名称使用 slotName 配置
        {
            prop: "username",
            label: "商品所属账号",
        },
        // pics
        {
            prop: "product_name",
            label: "商品名称",
            minWidth: "180",
        },
        {
            prop: "pics",
            label: "商品图片",
            width: "120"
        },
        {
            prop: "product_price",
            label: "价格",
        },
        {
            prop: "product_discount",
            label: "折扣",
        },
        {
            prop: "product_count",
            label: "数量",
        },
        {
            prop: "product_is_show",
            label: "状态",
        },
        {
            prop: "createAt",
            label: "创建时间",
            width: "120",
        },
        {
            prop: "updateAt",
            label: "更新时间",
            width: "120",
        },
        {
            label: "操作",
            slotName: "handle",
            width: "200",
            fixed: "right"
        }
    ]

    const payload = formData // 🔺模糊请求参数

    const paginationConfig: PaginationConfig = reactive(store.paginationConfig) // 分页器配置选项

    const queryList = store.queryList // 数据请求方法

    /* ---------------------------------------------- ↓ 表格头部 handle 部分  ----------------------------------------------*/
    const tableData = computed(() => store.activeUserInfo)

    // 左侧 select 多选框配置项
    const selectedList: Ref<any[]> = ref([])

    const tableEvents: Partial<TableEventType> = { // table 事件监听
        selectionChange(newSelection) { // 监听左侧多选框事件
            selectedList.value = newSelection
        }
    }

    return {
        tableConfig,
        paginationConfig,
        payload,
        queryList,
        tableData,
        tableEvents,
        selectedList
    }
}

export default useTableConfig
