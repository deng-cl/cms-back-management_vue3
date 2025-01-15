import { reactive } from "vue";
import { defineStore } from "pinia";

import { useCommonStoreConfig } from "../../config/useCommonStoreConfig"; //🔺 公共 store 配置对象 hook --> 对多个相同逻辑的 store 进行抽取，封装成一个 hook 函数


// 🔺分页器配置项
export const initFormData = () => ({ // 重置模糊查询参数
    tag_name: undefined,
    product_name: undefined,
    product_desc: undefined,
    isShow: "",
    min_price: undefined,
    max_price: undefined,
    createTime: undefined
})

export const formData = reactive(initFormData()) // 模糊查询参数查询

const useProductStore = defineStore("product_list", useCommonStoreConfig("/product/datelist/order_by/like", formData)) // 🔺通过 useCommonStoreConfig hook 传入对应的请求地址 url 与请求参数 formData，进行用户列表的请求，返回对应状态....

export default useProductStore
