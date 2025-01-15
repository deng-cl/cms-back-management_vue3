import type { IForm, IFormItem } from "@/base-ui/h-form/types"
import useTagStore, { formData, initFormData } from '../store'
import type { UseFormConfig } from "@/views/main/config/types"

const store = useTagStore()

const useFormConfig: UseFormConfig = () => {
    const formItems: IFormItem[] = [
        {
            field: "username",
            type: "input",
            label: "用户名",
            placeholder: "请输入用户名"
        },
        {
            field: 'name',
            type: "input",
            label: "姓名",
            placeholder: "请输入名字",
        },
        {
            field: 'phone',
            type: "number",
            label: "手机号",
            placeholder: "请输入手机号"
        },
        {
            field: 'enable',
            type: "radio",
            label: "用户状态",
            radioOptions: [
                { id: 1, label: "所有状态", value: "" },
                { id: 2, label: "启用状态", value: "true" },
                { id: 3, label: "禁用状态", value: "false" }
            ]
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
        }
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
