import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useCommonStoreConfig } from '@/store/hooks/useCommonStoreConfig'

// 🔺分页器配置项
export const initFormData = () => ({
    // 重置模糊查询参数
    product_name: undefined,
    product_desc: undefined,
    statusText: '',
    createTime: undefined
})

export const formData = reactive(initFormData()) // 模糊查询参数查询

const useOrderStore = defineStore('order', useCommonStoreConfig('/order', formData)) // 订单列表 store

export default useOrderStore
