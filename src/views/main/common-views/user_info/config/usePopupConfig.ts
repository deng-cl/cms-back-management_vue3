import type { PopupForm } from "@/base-ui/main-page-popup/types"
import { computed } from "vue"
import useTagStore from "../store"
import type { PopupConfig, PopupFooterConfig } from "@/base-ui/main/h-popup.vue"
import { editorPopupComfirm } from "./handleMethod"
import rules from "@/global/form-rules"

const store = useTagStore()

export const popupFormData: any = computed(() => {
    return store.userInfo
})

interface UsePopupConfigType extends PopupConfig {
    showPopup: any
}

const usePopupConfig: () => UsePopupConfigType = () => {

    const showPopup = computed(() => store.showPopupForm)

    const popupFormConfig: PopupForm = {
        formItems: [
            {
                field: "name",
                type: 'input',
                label: "姓名",
                placeholder: "请输入身姓名",
                rules: rules.name
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
            },
            {
                field: "phone",
                type: 'input',
                label: "手机号",
                placeholder: "请输入身手机号",
                rules: rules.phone
            },
            {
                field: "username",
                type: 'input',
                label: "用户名/账号",
                placeholder: "请输入用户名",
                rules: rules.username
            },
            {
                field: "nickname",
                type: 'input',
                label: "昵称",
                placeholder: "请输入昵称",
                rules: rules.nickname
            },
            {
                field: "shop_name",
                type: 'input',
                label: "店铺名称",
                placeholder: "请输入店铺名称",
            },
            {
                field: "id_card",
                type: 'input',
                label: "ID_Card",
                placeholder: "请输入身份证号",
            },
        ],
        colLayout: {
            xl: { span: 12 },
            lg: { span: 12 },
            md: { span: 18 },
            sm: { span: 24 },
            xs: { span: 24 },
        }
    }

    const popupFooterConfig: PopupFooterConfig = {
        confirmTitle: "确认修改",
        confirmEvent: () => {
            editorPopupComfirm()
        },
        cancelTitle: "取消",
        cancelEvent: () => {
            store.queryUserInfo()
            store.upHidePopupForm() // 更改是否显示弹出层状态未 false
        }
    }


    return {
        showPopup,
        popupFormConfig,
        popupFooterConfig,
        popupFormData
    }
}

export default usePopupConfig
