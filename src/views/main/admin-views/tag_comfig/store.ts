import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useCommonStoreConfig } from '@/store/hooks/useCommonStoreConfig'

// 🔺分页器配置项
export const initFormData = () => ({
    // 重置模糊查询参数
    tag: undefined,
    msg: undefined
})

export const formData = reactive(initFormData()) // 模糊查询参数查询

const useTagStore = defineStore('tag_comfig', useCommonStoreConfig('/product/query/tag_list_like', formData)) // 商品标签信息 store

export default useTagStore
