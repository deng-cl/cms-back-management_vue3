import type { IForm, IFormItem } from "@/base-ui/h-form/types"
import useOrderStore, { formData, initFormData } from '../store'
import type { UseFormConfig } from "@/views/main/config/types"

const store = useOrderStore()

const useFormConfig: UseFormConfig = () => {
    const formItems: IFormItem[] = [
        {
            field: "product_name",
            type: "input",
            label: "商品名称",
            placeholder: "请输入商品名称"
        },
        {
            field: 'product_desc',
            type: "input",
            label: "商品描述",
            placeholder: "请输入商品描述",
        },
        {
            field: 'createTime',
            type: 'piker',
            label: '创建时间',
            orhterOptions: {
                type: "daterange",
                startPlaceholder: "Start date",
                rangeSeparator: "To",
                endPlaceholder: "End date",
                valueFormat: "YYYY-MM-DD"
            }
        },
        {
            field: 'statusText',
            type: "radio",
            label: "订单状态",
            radioOptions: [
                { id: 1, label: "所有状态", value: "" },
                { id: 2, label: "待完成", value: "pedding" },
                { id: 3, label: "已完成", value: "fulfill" },
                { id: 6, label: "已退款", value: "failed" }
            ]
        },
    ]

    const formOptions: IForm = { // 🔺hForm 表单配置项
        formItems
    }

    const search = () => { //🔺 hForm 表单 search 事件方法，高级检索 --> 点击搜索按钮，重新请求对应数据
        store.reStateByQueryList() // 重置用户 store 状态
        store.queryList(formData)
    }

    const reset = () => { //🔺 重置按钮方法 --> 重置所有数据
        Object.assign(formData, initFormData())
    }

    return {
        formOptions,
        search,
        reset
    }
}

export default useFormConfig
