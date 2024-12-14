<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import { type EChartsOption } from 'echarts';

const props = withDefaults(
    defineProps<{
        title?: string
        width?: string
        height?: string
        options: EChartsOption
    }>(),
    {
        title: "Echart Default Title",
        width: "100%",
        height: "300px",
    }
)


// create echart config
const echartTag = ref<HTMLElement>()
onMounted(() => {
    const echart = echarts.init(echartTag.value)

    echart.setOption(props.options)
})

</script>

<template>
    <div class="base-echart">
        <h1 class="title">{{ title }}</h1>
        <div class="" ref="echartTag" :style="{ width, height }"></div>
    </div>
</template>

<style lang="scss" scoped>
.base-echart {
    padding: 5px 0;

    .title {
        font-size: 16px;
        font-weight: 500;
        color: #303133a6;
        padding-bottom: 15px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e2e2e2;
    }
}
</style>
