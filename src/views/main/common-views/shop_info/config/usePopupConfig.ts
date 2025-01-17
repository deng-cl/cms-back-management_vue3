import type { PopupForm } from '@/base-ui/main/types'
import { computed, reactive, ref, watch, type Ref } from 'vue'
import useProductStore from '../store'
import { createShop, editorShopInfo } from './handleMethod'
import type { PopupConfig, PopupFooterConfig } from '@/base-ui/main/h-popup.vue'
import { queryTagList } from '@/service/modules/main'
import type { IOptions } from '@/base-ui/h-form/types'
import rules from '@/global/form-rules'

const store = useProductStore()

export function initData() {
    return {
        // 默认表单 formData
        product_name: undefined,
        product_desc: undefined,
        product_price: undefined,
        product_discount: undefined,
        product_count: undefined,
        tag_name: undefined,
        pics: []
    }
}

store.popupFormData = initData()

export const popupFormData: any = computed(() => {
    return store.popupFormData
})

interface UsePopupConfigType extends PopupConfig {
    showPopup: any
}

const tagList: IOptions[] = await queryTagList() // 获取商品标签列表 select 数据配置项

const usePopupConfig: () => UsePopupConfigType = () => {
    // const showPopupType: Ref<'editor' | 'create'> = computed(() => ) // 展示弹出表单的类型 （创建标签 | 编辑标签）

    const showPopup = computed(() => store.showPopupForm)

    const popupTitle = computed(() => {
        return store.showPopupType === 'create' ? '创建商品' : '修改商品'
    })

    const popupFormConfig: PopupForm = {
        formItems: [
            {
                field: 'product_name',
                type: 'input',
                label: '商品名称',
                placeholder: '请输入商品名称',
                rules: rules.product_name
            },
            {
                field: 'product_desc',
                type: 'input',
                label: '描述',
                placeholder: '请输入商品描述信息<可自定义缩放表单大小>',
                orhterOptions: {
                    autosize: { minRows: 3, maxRows: 8 },
                    type: 'textarea'
                },
                rules: rules.product_desc
            },
            {
                field: 'product_price',
                type: 'number',
                label: '价格',
                placeholder: '请输商品价格',
                rules: rules.product_price
            },
            {
                field: 'product_discount',
                type: 'number',
                label: '折扣',
                placeholder: '请输入商品折扣',
                orhterOptions: {
                    min: 0,
                    max: 1
                },
                rules: rules.product_discount
            },
            {
                field: 'product_count',
                type: 'number',
                label: '数量',
                placeholder: '请输入商品数量',
                rules: rules.product_count
            },
            {
                field: 'tag_name',
                type: 'select',
                label: '商品标签',
                placeholder: '请选择商品标签',
                selectOptions: [...tagList],
                rules: rules.tag_name
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
            return store.showPopupType === 'create' ? '确认创建' : '确认修改'
        }),
        confirmEvent: () => {
            // 发送请求 .... 创建商品
            if (store.showPopupType === 'create') {
                createShop()
            } else {
                editorShopInfo() // 请求方法传入对应的数据参数
            }
        },
        cancelTitle: '取消',
        cancelEvent: () => {
            // 隐藏 popup 弹出层 ....
            store.upHidePopupForm() // 更改是否显示弹出层状态未 false
            store.popupFormData = initData() // 重置 popupFormData 数据
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
