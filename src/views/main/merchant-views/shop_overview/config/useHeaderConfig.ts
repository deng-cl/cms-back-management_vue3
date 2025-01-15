import { computed } from 'vue'
import { User, CollectionTag, UserFilled, ShoppingBag } from '@element-plus/icons-vue'
import type { HeaderConfigOfOverView } from '../../../admin-views/data_overview/config/types'
import useShopStatisticsStore from '../store'

const useOverViewConfig = async () => {
    // 🔺 ------------- 获取页面对应数据，并存储值 store 对应的字段中
    const statistics = computed(() => useShopStatisticsStore().statistics)

    const allProductStatistics = computed(() => statistics.value?.normalStatistic?.find((item) => item.isAll)) // -- 总商品数量与销售量

    const statusStatistic = computed(() => statistics.value?.statusStatistic) // -- 获取订单不同状态的数量（待完成、已完成、已退款）

    console.log(statistics)

    // 🔺 -------------  overview header 数据配置项 --> 根据服务器返回的数据，生成 header config 配置项
    const headerConfig: HeaderConfigOfOverView = {
        title: '总览',
        items: [
            {
                title: '商品数量',
                value: allProductStatistics.value?.statistics?.total ?? 0,
                icon: User
            },
            {
                title: '商品销量',
                value: allProductStatistics.value?.statistics?.slaes ?? 0,
                icon: CollectionTag
            },
            {
                title: '订单量',
                value: statistics.value?.orderCount ?? 0,
                icon: CollectionTag,
                style: 5
            },
            {
                title: '销售额(已完成)',
                value: statistics.value?.salesAmount ?? 0,
                icon: UserFilled,
                style: 2,
                animation: true
            },
            {
                title: '待完成',
                value: statusStatistic.value?.pedding ?? 0,
                icon: ShoppingBag,
                style: 4
            },
            {
                title: '已完成',
                value: statusStatistic.value?.fulfill ?? 0,
                icon: ShoppingBag,
                style: 2
            },
            {
                title: '已退款',
                value: statusStatistic.value?.failed ?? 0,
                icon: UserFilled,
                style: 3
            }
        ]
    }

    return {
        headerConfig
        // data
    }
}

export default useOverViewConfig
