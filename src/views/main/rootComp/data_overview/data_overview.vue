<script setup lang="ts">
import overviewHeader from "./overview-header.vue"
import baseEchart from "./base-echart.vue"
import useOverViewConfig from "./config/useHeaderConfig"
import useEchartConfig from "./config/useEchartConfig"

// header --------------------------------
const { headerConfig, data } = await useOverViewConfig()

// content
const { // echart config
    _echartConfig_1,
    _echartConfig_2,
    _echartConfig_4
} = useEchartConfig()

</script>

<template>
    <div class="overview">
        <overviewHeader :header-config="headerConfig"></overviewHeader>

        <div class="content">
            <el-row :gutter="20" class="row">
                <el-col class="col" :span="8">
                    <baseEchart :options="_echartConfig_1" title="类型分类用户数量"></baseEchart>
                </el-col>
                <el-col class="col grow" :span="8">
                    <baseEchart :options="_echartConfig_2" title="状态分类用户数量"></baseEchart>
                </el-col>
                <el-col class="col" :span="8">
                    <baseEchart :options="_echartConfig_1"></baseEchart>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="row">
                <el-col class="col grow" :span="24">
                    <baseEchart :options="_echartConfig_4" title="标签分类商品数量"></baseEchart>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped lang="scss">
.overview {
    background-color: white;
    display: flex;
    flex-flow: column nowrap;

    .content {
        border-top: 20px solid #f5f5f5;
        background-color: #f5f5f5;

        .row {
            display: flex;
            justify-content: space-between;
            flex-flow: row nowrap;
            margin-bottom: 20px;

            .col {
                background-color: white;
                margin: 0 10px;
                // padding: 10px;

            }

            .grow {
                flex: 1;
            }
        }
    }
}
</style>
