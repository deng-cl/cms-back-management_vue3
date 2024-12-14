import { computed, ref, type Ref } from 'vue'
import type { UseTableConfig } from '@/views/main/config/types'
import { queryGet } from '@/service/main/main'
import { handleMenuDataList } from '@/utils/mapMenu'

const useTableConfig: UseTableConfig | any = async () => {

    const tableConfig = [
        {
            prop: "title",
            label: "菜单名称",
            align: 'left',
            width: "180"
        },
        {
            prop: "icon",
            label: "菜单Icon"
        },
        {
            prop: "path",
            label: "菜单URL"
        },
        {
            prop: "permission",
            label: "按钮权限",
        },
        // {
        //     prop: "createAt",
        //     label: "创建时间",
        //     width: "140"
        // },
        // {
        //     prop: "updateAt",
        //     label: "更新时间",
        //     width: "140"
        // }
    ]

    /* ---------------------------------------------- ↓ 表格头部 handle 部分  ----------------------------------------------*/

    // 🔺注意: 因为 store.activeUserInfo 为计算属性（并非 ref/reactive）如果使用 ref、reactive或直接将 store.activeUserInfo 赋值给 tableData 会使状态的响应式无效，所以这里需要使用计算属性来返回对应的内容

    const tableData = ref()

    const menuData = (await queryGet("/user/get/menu", {})).data


    tableData.value = handleMenuDataList(menuData)

    return {
        tableConfig,
        tableData,
        queryList: () => { },
        payload: {},
        paginationConfig: undefined
    }
}

export default useTableConfig
