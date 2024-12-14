<script setup lang="ts">

const props = withDefaults( // 父组件需要传递的参数
    defineProps<{
        detailInfo: any,
        upHideDetail: () => void
    }>(),
    {
        detailInfo: () => ({})
    }
)

const INFOS: any[] = []
const ROW = ['商品姓名', '商品描述', '商品详情图'] // 定义需要独占一行的字段

Object.keys(props.detailInfo).forEach(key => {
    const info: any = {}

    if (key === 'product_name') {
        info.title = "商品名称"
        info.value = props.detailInfo[key]
    }

    if (key === 'product_desc') {
        info.title = "商品描述"
        info.value = props.detailInfo[key]
    }

    if (key === 'product_price') {
        info.title = "商品价格"
        info.value = '￥' + props.detailInfo[key]
    }

    if (key === 'product_discount') {
        info.title = "商品折扣"
        info.value = props.detailInfo[key]
    }

    if (key === 'product_count') {
        info.title = "商品数量"
        info.value = props.detailInfo[key]
    }

    if (key === 'product_is_show') {
        info.title = "商品状态"
        info.value = props.detailInfo[key]
    }

    if (key === 'tag_name') {
        info.title = "商品标签"
        info.value = props.detailInfo[key]
    }

    if (key === 'sales_count') {
        info.title = "销售量"
        info.value = props.detailInfo[key]
    }

    if (key === 'pics') {
        info.title = "商品详情图"
        info.value = props.detailInfo[key]
    }

    INFOS.push(info)
})

const BASE_URL = import.meta.env.VITE_APP_BASE_URL
</script>

<template>
    <div class="detail popup">
        <template v-for="(info, i) in  INFOS" :key="i">
            <template v-if="info.title">
                <template v-if="info.title === '商品详情图'">
                    <p style="width:100%">
                        <span class="title">商品详情图：</span>
                        <span class="pics">
                            <template v-for="(pic_info, i) in info.value" :key="i">
                                <template v-if="pic_info.imgUrl">
                                    <img :src="BASE_URL + pic_info.imgUrl" />
                                </template>
                                <template v-else>
                                    <span
                                        style="margin: .5333rem 0;font-size: .32rem; color:rgb(208 208 208 / 90%);">暂无商品详情图</span>
                                </template>
                            </template>
                        </span>
                    </p>
                </template>

                <template v-else>
                    <p :style="ROW.includes(info.title) ? { width: '100%' } : ''">
                        <span class="title">{{ info.title }}：</span>

                        <span v-if="info.title === '商品名称' || info.title === '商品描述'">
                            <el-tag size="large" type="primary">{{ info.value }}</el-tag>
                        </span>

                        <span v-else-if="info.title === '商品价格'">
                            <el-tag size="large" type="danger">{{ info.value }}</el-tag>
                        </span>

                        <span v-else-if="info.title === '商品状态'">
                            <el-tag :type="info.value === 'true' ? 'success' : 'danger'" size="large" plain>
                                {{ info.value === 'true' ? '上架' : '下架' }}</el-tag>
                        </span>

                        <span v-else-if="info.title === '商品标签'">
                            <el-tag size="large" type="primary">{{ info.value }}</el-tag>
                        </span>

                        <span v-else>
                            <el-tag size="large">{{ info.value }}</el-tag>
                        </span>
                    </p>
                </template>
            </template>
        </template>

        <el-button type="danger" class="button" @click="upHideDetail">关闭</el-button>
    </div>
</template>

<style scoped lang="scss">
.detail {
    max-width: 60vw;
    width: fit-content;
    height: fit-content;
    padding: 24px;
    position: fixed;
    inset: 0;
    margin: auto;
    background: rgb(255, 255, 255);
    z-index: 7;
    border-radius: 6px;
    display: flex;
    flex-flow: row wrap;
    box-shadow: 1px 1px 28px rgb(94 94 94 / 28%);

    p {
        width: 33.3333%;
    }

    p {
        color: rgb(43, 43, 43);

        .title {
            color: #00152996;
            font-size: 16px;
        }

        .pics {
            box-sizing: border-box;
            padding-left: 24px;
            display: flex;
            flex-flow: row wrap;

            img {
                margin: 18px;
                margin-left: 0;
                width: 80px;
            }
        }
    }

    .button {
        width: 6.1333rem;
        margin-left: auto;
    }
}
</style>
