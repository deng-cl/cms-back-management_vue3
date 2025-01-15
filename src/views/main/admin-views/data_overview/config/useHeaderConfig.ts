import { User, CollectionTag, UserFilled, ShoppingBag } from '@element-plus/icons-vue'
import type { HeaderConfigOfOverView } from './types'
import useOverViewStore from '../store'
import { computed } from 'vue'
import { queryOverviewData } from './queryOverviewData'

await queryOverviewData() // 请求数据战术数据

const store = useOverViewStore()

const useOverViewConfig = async () => {
    // 🔺 ------------- 获取页面对应数据，并存储值 store 对应的字段中
    const data = computed(() => store.data)

    // 🔺 -------------  overview header 数据配置项 --> 根据服务器返回的数据，生成 header config 配置项
    const headerConfig: HeaderConfigOfOverView = {
        title: "总览",
        items: [
            {
                title: "用户类型",
                value: store.user_type_info.length,
                icon: User
            },
            {
                title: "用户数量",
                value: store.user_count_info.total,
                icon: UserFilled
            },
            {
                title: "商品标签",
                value: store.tag_list.length,
                icon: CollectionTag
            },
            {
                title: "商品数量",
                value: store.shop_total.total,
                icon: ShoppingBag
            }
        ]
    }

    return {
        headerConfig,
        data
    }
}

export default useOverViewConfig
