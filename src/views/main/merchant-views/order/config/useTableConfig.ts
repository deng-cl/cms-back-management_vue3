import { computed, reactive, ref, type Ref } from 'vue'
import useOrderStore, { formData } from '../store'
import type { PaginationConfig, TableEventType } from '@/base-ui/h-table/types'
import type { UseTableConfig } from '@/views/main/config/types'

const store = useOrderStore()

const useTableConfig: UseTableConfig = () => {
    const tableConfig = [
        // 🔺el-table 表格配置项
        {
            prop: 'product_name',
            label: '商品名称',
            width: '180'
        },
        {
            prop: 'product_pics',
            label: '商品图片',
            width: '120'
        },
        {
            prop: 'product_desc',
            label: '商品描述',
            minWidth: '180',
            maxWidth: '240'
        },
        {
            prop: 'buy_count',
            label: '购买数量'
        },
        {
            prop: 'total_amount',
            label: '实付价格'
        },
        {
            prop: 'status',
            label: '订单状态',
            width: '180'
        },
        {
            prop: 'createAt',
            label: '创建时间',
            width: '120'
        },
        {
            prop: 'updateAt',
            label: '更新时间',
            width: '120'
        },
        {
            label: '操作',
            slotName: 'handle',
            width: '180',
            fixed: 'right'
        }
    ]

    const payload = formData // 🔺模糊请求参数

    const paginationConfig: PaginationConfig = reactive(store.paginationConfig) // 分页器配置选项

    const queryList = store.queryList // 数据请求方法

    /* ---------------------------------------------- ↓ 表格头部 handle 部分  ----------------------------------------------*/

    // 🔺注意: 因为 store.activeUserInfo 为计算属性（并非 ref/reactive）如果使用 ref、reactive或直接将 store.activeUserInfo 赋值给 tableData 会使状态的响应式无效，所以这里需要使用计算属性来返回对应的内容
    const tableData = computed(() => store.activeUserInfo)

    // 左侧 select 多选框配置项
    const selectedList: Ref<any[]> = ref([])

    const tableEvents: Partial<TableEventType> = {
        // table 事件监听
        selectionChange(newSelection) {
            // 监听左侧多选框事件
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
