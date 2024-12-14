import { computed, ref, watch, type Ref } from 'vue';
import useShopStatisticsStore from "../store"

const useEchartConfig = () => {
    const store = useShopStatisticsStore()

    const classifyStatistics = computed(() => store.statistics?.normalStatistic?.filter(item => !item.isAll))

    // ----- config
    const _echartConfig_1: any = computed(() => { // -- 各标签商品数量
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '0%',
                left: 'center'
            },
            series: [
                {
                    name: '各商品标签的商品数量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 12,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: (() => {
                        return classifyStatistics.value?.map(item => {
                            return {
                                value: item.statistics.total,
                                name: item.tag_name
                            }
                        })
                    })()
                }
            ]
        }
    })

    const _echartConfig_2: any = computed(() => { // -- 各标签商品销量
        return {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '0%',
                left: 'center'
            },
            series: [
                {
                    name: '各商品标签的商品销量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 12,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: (() => {
                        return classifyStatistics.value?.map(item => {
                            return {
                                value: item.statistics.slaes,
                                name: item.tag_name
                            }
                        })
                    })()
                }
            ]
        }
    })

    return {
        _echartConfig_1,
        _echartConfig_2
    }
}

export default useEchartConfig

