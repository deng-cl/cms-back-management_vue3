<script setup lang="ts">
import OverviewHeader from "../../rootComp/data_overview/overview-header.vue"
import BaseEchart from "../../rootComp/data_overview/base-echart.vue"
import useHeaderConfig from "./config/useHeaderConfig"
import useShopStatisticsStore from "./store"
import useEchartConfig from "./config/useEchartConfig"

await useShopStatisticsStore().dispatchStatisticsFetch() // -- 获取统计数据

const { headerConfig } = await useHeaderConfig()
const { _echartConfig_1, _echartConfig_2 } = useEchartConfig()

</script>

<template>
    <div class="shop-overview">
        <OverviewHeader :header-config="headerConfig" />

        <div class="content">
            <el-row :gutter="20" class="row">
                <el-col class="col" :span="12">
                    <BaseEchart :options="_echartConfig_1" title="各商品标签的商品数量"></BaseEchart>
                </el-col>
                <el-col class="col grow" :span="12">
                    <BaseEchart :options="_echartConfig_2" title="各商品标签的商品销量"></BaseEchart>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<style scoped lang="scss">
.shop-overview {
    padding: 0 24px;
    box-sizing: border-box;
}
</style>
