import type { IForm, IFormItem, IOptions } from "@/base-ui/h-form/types"
import useTagStore, { formData, initFormData } from '../store'
import type { UseFormConfig } from "@/views/main/config/types"
import { queryTagList } from "@/service/main/main"

const store = useTagStore()

const tagList: IOptions[] = await queryTagList() // 获取商品标签列表 select 数据配置项

const useFormConfig: UseFormConfig = () => {
    const formItems: IFormItem[] = [
        {
            field: "tag_name",
            type: "select",
            label: "商品标签",
            placeholder: "请选择商品标签（默认所有）",
            selectOptions: [
                { // 所有标签选项
                    value: undefined,
                    label: "默认选项"
                },
                ...tagList
            ]
        },
        {
            field: 'product_name',
            type: "input",
            label: "名称",
            placeholder: "请输入商品名称",
        },
        {
            field: 'product_desc',
            type: "input",
            label: "描述",
            placeholder: "请输入商品描述"
        },
        {
            field: 'min_price',
            type: "number",
            label: "最小价格",
            placeholder: "请输入商品最小价格"
        },
        {
            field: 'max_price',
            type: "number",
            label: "最大价格",
            placeholder: "请输入商品最大价格"
        },
        {
            field: 'isShow',
            type: "radio",
            label: "上架状态",
            radioOptions: [
                { id: 1, label: "All", value: "" },
                { id: 2, label: "是", value: "true" },
                { id: 3, label: "否", value: "false" }
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
