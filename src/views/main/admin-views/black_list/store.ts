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

const useBlackUser = defineStore('black_user', useCommonStoreConfig('/user/disable/list', formData, true)) // 配置商家用户 store

export default useBlackUser
