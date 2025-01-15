import { computed, reactive } from 'vue'
import type { PaginationConfig } from '@/base-ui/h-table/types'
import useTagStore, { formData } from '../store'
import type { DefaultHeaderHandleConfig, HandleColumnEventType } from '@/base-ui/main/h-content.vue'
import type { UseTableConfig } from '@/views/main/config/types'
import { queryDelete } from '@/service/modules/main'
import showMessage from '@/utils/showMessage'

const store = useTagStore()

const useTableConfig: UseTableConfig = () => {
    const tableConfig = [
        // 🔺el-table 表格配置项
        {
            prop: 'tag_name',
            label: '标签名',
            width: '150'
        },
        {
            prop: 'tag_msg',
            label: '标签描述'
        },
        {
            label: '操作',
            slotName: 'handle',
            width: '130'
        }
    ]

    const payload = formData // 🔺模糊请求参数

    const paginationConfig: PaginationConfig = reactive(store.paginationConfig) // 分页器配置选项

    const queryList = store.queryList // 数据请求方法

    /* ---------------------------------------------- ↓ 表格头部 handle 部分  ----------------------------------------------*/
    const handleConfig: DefaultHeaderHandleConfig = {
        name: '新建标签',
        click() {
            // 显示 popup 弹出层表单 --> 创建商品标签
            store.showPopupType = 'create' // 将 popup 配置类型改为 create 新建类型
            store.popupFormData = {
                // 当点击新建按钮时，用于创建标签，重置 popup 中的 formData <避免 formData 遗留前面编辑的哪一行数据...>
                tag: undefined,
                msg: undefined
            }
            store.upShowPopupForm() // 更改是否显示弹出层状态未 true
        }
    }

    // 🔺注意: 因为 store.activeUserInfo 为计算属性（并非 ref/reactive）如果使用 ref、reactive或直接将 store.activeUserInfo 赋值给 tableData 会使状态的响应式无效，所以这里需要使用计算属性来返回对应的内容
    const tableData = computed(() => store.activeUserInfo)

    // table 表格左侧 handle 部分事件逻辑
    const handleColumnEvnet: HandleColumnEventType = {
        editorClickEvent(rowData: any) {
            // 编辑/修改商品标签
            store.showPopupType = 'editor' // 将 popup 配置类型改为 editor 编辑类型
            store.popupFormData = {
                // 当点击编辑时，将 store 中的 popupFormData 状态修改为当前行的数据 --> 用于方便弹出层表单展示所要编辑的数据 <修改 popup 中的 formData>
                id: rowData?.id, // 根据 id 修改对应的标签
                tag: rowData?.tag_name,
                msg: rowData?.tag_msg
            }
            store.upShowPopupForm() // 显示 popup 表单
        },
        async deleteClickEvent(rowData: any) {
            // 删除商品标签
            const { id, tag_name } = rowData // 1. 获取所触发 delete 事件的改行标签数据

            if (confirm(`请再次确认删除 "${tag_name}" 标签`)) {
                const deleted = await queryDelete(`/product/delete/tag/${id}`, {}) // 2. 发送请求 --> 删除对应标签
                if (deleted !== false) {
                    queryList(payload) // 3. 重新更新数据
                    showMessage.success(`已为您删除 "${tag_name}" 标签!`)
                }
            }
        }
    }
    return {
        tableConfig,
        paginationConfig,
        payload,
        queryList,
        tableData,
        handleConfig,
        handleColumnEvnet
    }
}

export default useTableConfig
