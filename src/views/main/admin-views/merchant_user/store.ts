import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useCommonStoreConfig } from '@/store/hooks/useCommonStoreConfig'

export const initFormData = () => ({
    // 重置 formData 参数
    username: undefined,
    name: undefined,
    phone: undefined,
    enable: '',
    createTime: undefined
})

export const formData = reactive(initFormData()) // formData  模糊查询参数

const useMerchantlUser = defineStore('merchant_user', useCommonStoreConfig('/user/user_list/like/2', formData)) // 配置商家用户 store

export default useMerchantlUser
