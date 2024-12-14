<script setup lang="ts">
import { queryPut } from "../../../../service/main/main"
import { ElMessageBox } from 'element-plus'

import MainPageSearch from '@/base-ui/main--page-search/main-page-search.vue';
import MainPageContent from "@/base-ui/main-page-content/main-page-content.vue";
import MainPagePopup from '@/base-ui/main-page-popup/main-page-popup.vue';

import useFormConfig from './config/useFormConfig'
import useTableConfig from './config/useTableConfig';
import showMessage from "@/utils/showMessage";


const { formOptions, search, reset, } = useFormConfig() // 获取 form 配置项 hook
const { tableConfig, paginationConfig, payload, queryList, tableData, tableEvents, selectedList } = useTableConfig() // 获取 table 配置项 hook

queryList(payload) // 初始数据请求

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

// -- 修改订单状态方法
enum OrderStatus {
    REFUNDED = '-2', // -- 已退款
    SALES_RETURN_PEDDING = '-1', // -- 用户申请退款/待处理申请
    PEDDING = '0', // -- 订单待处理（待发货）
    WAIT_FOR_RECEIVING = '1', // -- 已发货/待用户确认收货
    FINISHED = '2', // -- 已完成
}
const modifyOrderStatus = async (id: number, status: OrderStatus, promptText: string, title?: string) => {
    // try {
    //     await ElMessageBox.confirm(
    //         `请在此确认${state ? '上架' : '下架'}此商品`,
    //         '确认框',
    //         {
    //             distinguishCancelAndClose: true,
    //             confirmButtonText: '确认',
    //             cancelButtonText: '取消',
    //         }
    //     )

    //     const res = await queryPut("/product/update/state", { id, state: String(state) })

    //     showMessage.success(`商品${state ? '上架' : '下架'}成功`)
    // } catch (e) {
    //     if (e === "cancel") return
    //     showMessage.error(`商品${state ? '上架' : '下架'}失败: ` + e)
    // }

    try {
        await ElMessageBox.confirm(
            `请再次确认对此订单的 "${promptText}" 操作`,
            title ?? promptText,
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
        )

        await queryPut("/order/status", { order_id: id, status }) // -- 修改订单状态

        await queryList(payload) // -- 更新订单数据

        showMessage.success(`已订单状态更新`)
    } catch (error) {
        if (error === "cancel" || error === "close") return
        showMessage.error(`订单状态更新失败`)
    }

}
</script>

<template>
    <div class="order">
        <MainPageSearch :form-options="formOptions" :form-data="payload" :search="search" :reset="reset">
            订单查询
        </MainPageSearch>

        <!-- table 展示 -->
        <MainPageContent title="商家用户注册申请列表" :table-config="tableConfig" :pagination-config="paginationConfig"
            :table-data="tableData" :tableEvents="tableEvents">
            <template #enable="scope">
                <el-button style="cursor: auto" :type="'success'" size="small" plain>{{ scope.row.status }}</el-button>
            </template>

            <!-- 自定义图片显示 -->
            <template #product_pics="{ row }">
                <img v-if="row.product_pics[0]" class="picture" :src="BASE_URL + row.product_pics[0]" alt="商品图">
                <P v-else>无</p>
            </template>

            <!-- 订单状态 -->
            <template #status="{ row }">
                <template v-if="row.status === '-2'">
                    <el-button style="cursor: auto" type="danger" size="small" plain link>已退款</el-button>
                </template>
                <template v-else-if="row.status === '-1'">
                    <el-button style="cursor: auto" type="danger" size="small" plain>退款申请待处理</el-button>
                </template>
                <template v-else-if="row.status === '0'">
                    <el-button style="cursor: auto" type="primary" size="small" plain>待发货</el-button>
                </template>
                <template v-else-if="row.status === '1'">
                    <el-button style="cursor: auto" type="warning" size="small" plain>已发货/待客户收货</el-button>
                </template>
                <template v-else-if="row.status === '2'">
                    <el-button style=" cursor: auto" type="success" size="small" plain link>已完成</el-button>
                </template>
            </template>

            <!-- 不同状态的操作按钮 -->
            <template #handle-column="{ row }">
                <template v-if="row.status === '-1'">
                    <el-button class="el-button-custom" size="small"
                        @click="modifyOrderStatus(row.id, OrderStatus.REFUNDED, '同意退款', '退款申请处理')"
                        type="primary">同意申请</el-button>
                    <el-button class="el-button-custom" size="small"
                        @click="modifyOrderStatus(row.id, OrderStatus.WAIT_FOR_RECEIVING, '拒绝退款', '退款申请处理')"
                        type="danger">拒绝申请</el-button>
                </template>
                <template v-else-if="row.status === '0'">
                    <el-button class="el-button-custom" size="small"
                        @click="modifyOrderStatus(row.id, OrderStatus.WAIT_FOR_RECEIVING, '商品发货', '商品发货')"
                        type="primary">商品发货</el-button>
                    <el-button class="el-button-custom" size="small"
                        @click="modifyOrderStatus(row.id, OrderStatus.REFUNDED, '取消订单')" type="danger">取消订单</el-button>
                </template>
                <template v-else-if="row.status === '1'">
                    <el-button class="el-button-custom" size="small"
                        @click="modifyOrderStatus(row.id, OrderStatus.PEDDING, '撤销发货')" type="warning">撤销发货</el-button>
                </template>
                <template v-else>
                    <el-button class="el-button-custom" size="small" type="info" link>无</el-button>
                </template>
            </template>
        </MainPageContent>
    </div>
</template>

<style scoped lang="scss">
.el-button-custom {
    padding: 14px 10px;
}

.picture {
    height: 60px
}
</style>
