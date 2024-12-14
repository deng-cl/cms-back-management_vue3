import { computed, reactive } from 'vue'
import type { PaginationConfig } from "@/base-ui/h-table/h-table.vue"
import type { UseTableConfig } from '@/views/main/config/types'
import type { DefaultHeaderHandleConfig } from '@/base-ui/main-page-content/main-page-content.vue'
import useBlackUser, { formData } from '../store'

const store = useBlackUser()

const useTableConfig: UseTableConfig = () => {
    const tableConfig = [ // 🔺el-table 表格配置项
        // 当有 prop 配置时，插槽名称默认使用 prop，没有 prop 时插槽名称使用 slotName 配置
        {
            prop: "username",
            label: "用户名"
        },
        {
            prop: "name",
            label: "姓名"
        },
        {
            prop: "phone",
            label: "手机号"
        },
        {
            prop: "enable",
            label: "状态",
            width: "100"
        },
        {
            prop: "createAt",
            label: "创建时间",
            width: "140"
        },
        {
            prop: "updateAt",
            label: "更新时间",
            width: "140"
        }
    ]

    const paginationConfig: PaginationConfig = reactive(store.paginationConfig) // 分页器配置选项

    const queryList = store.queryList // 数据请求方法

    /* ---------------------------------------------- ↓ 表格头部 handle 部分  ----------------------------------------------*/

    // 🔺注意: 因为 store.activeUserInfo 为计算属性（并非 ref/reactive）如果使用 ref、reactive或直接将 store.activeUserInfo 赋值给 tableData 会使状态的响应式无效，所以这里需要使用计算属性来返回对应的内容
    const tableData = computed(() => store.activeUserInfo)

    // console.log(tableData.value[0].is_black_user)

    const payload = {}

    return {
        tableConfig,
        paginationConfig,
        payload,
        queryList,
        tableData,
    }
}

export default useTableConfig
