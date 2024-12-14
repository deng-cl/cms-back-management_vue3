import { reactive } from 'vue'
import type { IForm, IFormItem } from "@/base-ui/h-form/types"
import type { PaginationConfig } from "@/base-ui/h-table/h-table.vue"

import /* store */ useNormalUser, { /* 初始化 formData 方法 */ initFormData, /* 分页模糊查询参数 */ formData } from "./store"


const store = useNormalUser() // 🔺 normal user store --> pinia

/* ---------------------------------------------- ↓ 表单配置  ----------------------------------------------*/
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
    }
]
