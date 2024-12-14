import type { PopupForm } from "@/base-ui/main-page-popup/types"
import { computed, reactive, ref, watch, type Ref, } from "vue"
import useTagStore from "../store"
import { createPopupComfirm } from "./handleMethod"
import type { PopupConfig, PopupFooterConfig } from "@/base-ui/main-page-popup/main-page-popup.vue"
import rules from "@/global/form-rules"

const store = useTagStore()

store.popupFormData = { // 默认表单 formData
    nickname: undefined,
    sex: "未知",
    age: undefined,
    name: undefined,
    username: undefined,
    phone: undefined,
    password: undefined,
}

export const popupFormData: any = computed(() => {
    return store.popupFormData
})

interface UsePopupConfigType extends PopupConfig {
    showPopup: any
}

const usePopupConfig: () => UsePopupConfigType = () => {
    const showPopup = computed(() => store.showPopupForm)

    const popupTitle = "创建商家用户"

    const popupFormConfig: PopupForm = {
        formItems: [
            {
                field: "username",
                type: 'input',
                label: "用户名/账号",
                placeholder: "请输入用户名",
                rules: rules.username
            },
            {
                field: "password",
                type: 'password',
                label: "密码",
                placeholder: "请输入密码",
                rules: rules.password
            },
            {
                field: "phone",
                type: 'input',
                label: "手机号",
                placeholder: "请输入身手机号",
                rules: rules.phone
            },
            {
                field: "name",
                type: 'input',
                label: "姓名",
                placeholder: "请输入身姓名",
                rules: rules.name
            },
            {
                field: "nickname",
                type: 'input',
                label: "昵称",
                placeholder: "请输入昵称",
                rules: rules.nickname
            },
            {
                field: "sex",
                type: 'radio',
                label: "性别",
                placeholder: "请输入标签名",
                radioOptions: [
                    {
                        label: "未知",
                        value: "未知"
                    },
                    {
                        label: "男",
                        value: "男"
                    },
                    {
                        label: "女",
                        value: "女"
                    },
                ]
            },
            {
                field: "age",
                type: 'number',
                label: "年龄",
                placeholder: "请输入年龄",
                rules: rules.age
            }
        ],
        colLayout: {
            xl: { span: 12 },
            lg: { span: 12 },
            md: { span: 20 },
            sm: { span: 24 },
            xs: { span: 24 },
        }
    }

    const popupFooterConfig: PopupFooterConfig = {
        confirmTitle: "确认创建",
        confirmEvent: () => {
            // 发送请求 ....
            createPopupComfirm()
        },
        cancelTitle: "取消",
        cancelEvent: () => {
            // 隐藏 popup 弹出层 ....
            store.upHidePopupForm() // 更改是否显示弹出层状态未 false
        }
    }

    return {
        popupTitle,
        showPopup,
        popupFormConfig,
        popupFooterConfig,
        popupFormData
    }
}

export default usePopupConfig
