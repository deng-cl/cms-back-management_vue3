import { computed, ref, watch, type Ref } from 'vue';
import useOverViewStore from '../store'

const useEchartConfig = () => {
    const store = useOverViewStore()

    // ----- config
    const _echartConfig_1: any = computed(() => {
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
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
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
                    data: [
                        { value: store?.user_count_info?.root_total, name: 'Root User' },
                        { value: store?.user_count_info?.merchant_total, name: 'Merchant User' },
                        { value: store?.user_count_info?.normal_total, name: 'Normal User' },
                    ]
                }
            ]
        }
    })

    const _echartConfig_2: any = computed(() => {
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
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    padAngle: 5,
                    itemStyle: {
                        borderRadius: 10,
                        color: function (colors: any) {
                            const colorList = ['#91cc75', '#ee6666', '#fac858', '#5470c6', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
                            return colorList[colors.dataIndex]
                        }
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
                    data: [
                        { value: store?.user_count_info?.enable, name: 'enable user' },
                        { value: store?.user_count_info?.disable, name: 'disable user' }
                    ]
                }
            ]
        }
    })

    const _echartConfig_3 = null // 待定

    const _echartConfig_4: any = computed(() => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [...store.shop_count_info.name], // 因为为了避免重复请求造成的 store.shop_count_info.name 的数据格式使用的是 Set 数据结构 --> 所以这里需要通过解构将对应的值解构出来
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: store.shop_count_info.data
                }
            ]
        }
    })

    return {
        _echartConfig_1,
        _echartConfig_2,
        _echartConfig_3,
        _echartConfig_4
    }
}

export default useEchartConfig
