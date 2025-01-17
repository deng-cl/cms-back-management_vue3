import type { PopupForm } from '@/base-ui/main/types'
import { computed, reactive, ref, watch, type Ref } from 'vue'
import useTagStore from '../store'
import { editorPopupComfirm, createPopupComfirm } from './handleMethod'
import type { PopupConfig, PopupFooterConfig } from '@/base-ui/main/h-popup.vue'
import rules from '@/global/form-rules'

const store = useTagStore()

store.popupFormData = {
    // 默认表单 formData
    tag: undefined,
    msg: undefined
}

export const popupFormData: any = computed(() => {
    return store.popupFormData
})

interface UsePopupConfigType extends PopupConfig {
    showPopup: any
}

const usePopupConfig: () => UsePopupConfigType = () => {
    // const showPopupType: Ref<'editor' | 'create'> = computed(() => ) // 展示弹出表单的类型 （创建标签 | 编辑标签）

    const showPopup = computed(() => store.showPopupForm)

    const popupTitle = computed(() => {
        return store.showPopupType === 'create' ? '修改标签' : '新建标签'
    })

    const popupFormConfig: PopupForm = {
        formItems: [
            {
                field: 'tag',
                type: 'input',
                label: '标签名',
                placeholder: '请输入标签名',
                rules: rules.tag_name
            },
            {
                field: 'msg',
                type: 'input',
                label: '描述',
                placeholder: '请输入标签的描述信息<可自定义缩放表单大小>',
                orhterOptions: {
                    autosize: { minRows: 3, maxRows: 6 },
                    type: 'textarea'
                },
                rules: rules.tag_msg
            }
        ],
        colLayout: {
            xl: { span: 24 },
            lg: { span: 24 },
            md: { span: 24 },
            sm: { span: 24 },
            xs: { span: 24 }
        }
    }

    const popupFooterConfig: PopupFooterConfig = {
        confirmTitle: computed(() => {
            return store.showPopupType === 'create' ? '确认新建' : '确认修改'
        }),
        confirmEvent: () => {
            // 发送请求 ....
            if (store.showPopupType === 'create') {
                createPopupComfirm()
            } else {
                editorPopupComfirm() // 请求方法传入对应的数据参数
            }
        },
        cancelTitle: '取消',
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
