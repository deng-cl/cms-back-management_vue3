import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { queryGet } from '@/service/modules/main'

const useShopStatisticsStore = defineStore('shop_overview', () => {
    const statistics = ref<IStatistics | null>(null)

    const dispatchStatisticsFetch = async () => {
        const res = await queryGet('/order/view', {}, true)

        if (res.data as IStatistics) {
            statistics.value = res.data
        }
    }

    return { statistics, dispatchStatisticsFetch }
})

export default useShopStatisticsStore

interface IStatistics {
    // -- "/order/view" 接口响应式数据
    normalStatistic:
        | {
              isAll?: boolean
              tag_id?: number
              tag_name?: string
              statistics: {
                  total: number
                  slaes: string | number
              }
          }[]
        | null
    statusStatistic: {
        pedding: number
        fulfill: number
        failed: number
    } | null
    orderCount: number | null
    salesAmount: string | null
}
