import type { IForm } from "@/base-ui/h-form/types"
import type { PaginationConfig, TableEventType } from "@/base-ui/h-table/h-table.vue"
import type { DefaultHeaderHandleConfig, HandleColumnEventType } from "@/base-ui/main-page-content/main-page-content.vue"
import type { Ref } from "vue"

interface UseFormConfigReturn {
    formOptions: IForm
    search: () => void
    reset: () => void
}
export type UseFormConfig = () => UseFormConfigReturn // formConfig hook 函数类型


interface UseTableConfigReturn {
    tableConfig: any
    paginationConfig: PaginationConfig | undefined
    payload: any,
    tableData: any
    queryList: (payload: any) => void
    handleConfig?: DefaultHeaderHandleConfig
    tableEvents?: Partial<TableEventType>
    selectedList?: Ref<any[]>
    handleColumnEvnet?: HandleColumnEventType,
    handleButtonConfig?: DefaultHeaderHandleConfig
}
export type UseTableConfig = () => UseTableConfigReturn // tableConfig hook 函数类型
