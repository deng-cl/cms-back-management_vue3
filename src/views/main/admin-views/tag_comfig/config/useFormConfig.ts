import type { IForm, IFormItem } from "@/base-ui/h-form/types"
import useTagStore, { formData, initFormData } from '../store'
import type { UseFormConfig } from "@/views/main/config/types"
import rules from "@/global/form-rules";

const store = useTagStore()

const useFormConfig: UseFormConfig = () => {
    const formItems: IFormItem[] = [
        {
            field: "tag",
            type: "input",
            label: "标签名",
            placeholder: "请输入标签名",
        },
        {
            field: 'msg',
            type: "input",
            label: "描述",
            placeholder: "请输入标签描述信息",
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
