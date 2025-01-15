import { defineStore } from "pinia"
import { ref, type Ref } from 'vue'


interface ShopCountInfoType {
    tag_name: string
    shop_count: number
}
interface RQueryData {
    tag_list: any // 商品标签数据
    user_type_info: any // 用户类型数据
    user_count_info: any // 对应类型的用户总数
    shop_total: any // 商品总数
    shop_count_info: any
}


// ------------------------
const useOverViewStore = defineStore('overview', () => {
    const tag_list: any = ref()
    const user_type_info: any = ref()
    const user_count_info: any = ref()
    const shop_total: any = ref()
    const shop_count_info: any = ref({
        name: new Set(),
        data: []
    })

    const data: RQueryData = {
        tag_list,
        user_type_info,
        user_count_info,
        shop_total,
        shop_count_info,
    }

    return {
        tag_list,
        user_type_info,
        user_count_info,
        shop_total,
        shop_count_info,
        data
    }
})


export default useOverViewStore
