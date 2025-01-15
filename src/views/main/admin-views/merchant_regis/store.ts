import { reactive } from "vue";
import { defineStore } from "pinia";
import { useCommonStoreConfig } from "../../config/useCommonStoreConfig";


// 🔺分页器配置项
export const initFormData = () => ({ // 重置模糊查询参数
    username: undefined,
    name: undefined,
    phone: undefined,
    id_card: undefined,
    state: "",
    createTime: undefined
})

export const formData = reactive(initFormData()) // 模糊查询参数查询

const useMerchantRegisterStore = defineStore('merchant_register', useCommonStoreConfig("/user/merchant/register", formData)) // 商家注册信息 store

export default useMerchantRegisterStore
