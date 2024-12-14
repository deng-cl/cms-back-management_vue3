<script setup lang="ts">
import mainPageSearch from "@/base-ui/main--page-search/main-page-search.vue";
import mainPageContent from "@/base-ui/main-page-content/main-page-content.vue";
import mainPagePopup from '@/base-ui/main-page-popup/main-page-popup.vue';
import detailComp from "./detail_comp.vue"
import useProductStore from "./store"
import useFormConfig from './config/useFormConfig';
import useTableConfig from './config/useTableConfig';
import usePopupConfig, { initData } from "./config/usePopupConfig";

import {  /* 判断用户是否存在某一按钮权限 */ isExitsPermission } from '@/utils/mapMenu'

const { formOptions, search, reset, } = useFormConfig() // 获取 form 配置项 hook
const { tableConfig, paginationConfig, payload, queryList, tableData, tableEvents, selectedList } = useTableConfig() // 获取 table 配置项 hook

queryList(payload) // 初始数据请求

import { /* 批量上架或下架商品 */  updateShopState, editorShopInfo, deleteShopInfo } from './config/handleMethod'


const store = useProductStore() // store pinia

const {
    popupTitle,
    showPopup,
    popupFormConfig,
    popupFooterConfig,
    popupFormData
} = usePopupConfig() // 获取 popupConfig 配置项


// ------ 处理新建商品时，对应文件上传部分
import { ref, computed } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import { ElMessage, ElMessageBox, type UploadFile } from 'element-plus'
import type { UploadFiles } from "element-plus/lib/components/upload/src/upload.js";
import { queryPut } from "@/service/main/main";
import showMessage from "@/utils/showMessage";

const dialogImageUrl = ref('')

const dialogVisible = ref(false)

const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
    console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
    console.log(file)
}

function selectChange(file: UploadFile, files: UploadFiles) { // 监听 upload 选择图像信息
    store.popupFormData.pics = files // 存储选择的图片信息
}

function changeClickCreateButton() { // 🔺监听点击新建商品按钮
    store.showPopupType = 'create' // 将 popup 配置类型改为 create 新建类型
    store.popupFormData = initData() // 重置 popupFormData
    store.upShowPopupForm()
}


// ------ 处理点击编辑时，对原有的详情图进行处理
const detail_pics: any = ref([])
function changeClickEditorButton(rowData: any) { // 🔺监听点击编辑商品按钮 -- false
    detail_pics.value = []
    store.showPopupType = 'editor' // 将 popup 配置类型改为 editor 新建类型
    store.popupFormData = rowData // 将当行数据赋值给 popupFormData 中

    // ▲ 处理图片预览的效果 -- false
    rowData.pics.forEach((item: any) => {
        if (item.imgUrl) {
            detail_pics.value.push(import.meta.env.VITE_APP_BASE_URL + item.imgUrl)
        }
    })

    store.popupFormData.detail_pics = computed(() => {
        return detail_pics.value
    })

    store.upShowPopupForm()
}


// --- 处理商品详情部分
const showDetail = ref(false)
const detailData = ref()
const upShowDetail = () => showDetail.value = true
const upHideDetail = () => showDetail.value = false
function showProductDetail(rowData: any) {
    detailData.value = rowData
    console.log(rowData);

    upShowDetail() // 显示 detail 部分
}


// -- 处理商品状态部分
async function updateProductState(id: number, state: boolean) {
    try {
        await ElMessageBox.confirm(
            `请在此确认${state ? '上架' : '下架'}此商品`,
            '确认框',
            {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }
        )

        const res = await queryPut("/product/update/state", { id, state: String(state) })

        showMessage.success(`商品${state ? '上架' : '下架'}成功`)
    } catch (e) {
        if (e === "cancel" || e === "close") return
        showMessage.error(`商品${state ? '上架' : '下架'}失败: ` + e)
    }
}

const BASE_URL = import.meta.env.VITE_APP_BASE_URL
</script>

<template>
    <div class="shop_info">
        <!-- 检索区域 -->
        <mainPageSearch :form-options="formOptions" :form-data="payload" :search="search" :reset="reset">
            商品查询
        </mainPageSearch>

        <!-- 数据展示区域 -->
        <mainPageContent title="商品信息" :table-config="tableConfig" :pagination-config="paginationConfig"
            :table-data="tableData" :tableEvents="tableEvents">
            <template #product_is_show="scope">
                <!-- 自定义上架状态 -->
                <el-button style="cursor: auto" :type="scope.row.product_is_show === 'true' ? 'success' : 'danger'"
                    size="small" plain>
                    {{ scope.row.product_is_show === 'true' ? '上架' : '下架' }}</el-button>
            </template>

            <template #header-handle>
                <el-button type="primary" v-if="isExitsPermission('shop_store:shop_info:create')"
                    @click="changeClickCreateButton">新建商品</el-button>
                <el-button type="danger" @click="updateShopState(selectedList as any[], 'false')">批量下架</el-button>
                <el-button type="primary" @click="updateShopState(selectedList as any[], 'true')">批量上架</el-button>
            </template>

            <template #handle-column="scope">
                <template v-if="isExitsPermission('shop_store:shop_info:delete')">
                    <el-button size="small" type="danger" @click="changeClickEditorButton(scope.row)">编辑</el-button>
                    <el-button size="small" type="primary" @click="deleteShopInfo(scope.row)">删除</el-button>
                </template>
                <template v-else>
                    <el-button v-if="scope.row.product_is_show !== 'false'" size="small" type="danger"
                        @click="updateProductState(scope.row?.id, false)">下架</el-button>
                    <el-button v-else size="small" type="primary"
                        @click="updateProductState(scope.row?.id, true)">上架</el-button>
                </template>
                <el-button size="small" type="info" @click="showProductDetail(scope.row)">详情</el-button>
            </template>

            <!-- 自定义图片显示 -->
            <template #pics="{ row }">
                <img v-if="row.pics[0].imgUrl" class="picture" :src="BASE_URL + row.pics[0].imgUrl" alt="商品图">
                <P v-else>无</p>
            </template>
        </mainPageContent>

        <!-- 修改商品弹出区域 -->
        <mainPagePopup :style="{ minWidth: '30vw', width: '30vw' }" v-if="showPopup" :popup-title="popupTitle"
            :popup-form-config="popupFormConfig" :popup-footer-config="popupFooterConfig"
            :popup-form-data="popupFormData">

            <!-- 商品详情图上传部分 -->
            <template #custom_slot>
                <div class="detail_img">
                    <div class="box" v-for="(src, i) in detail_pics" :key="i">
                        <template v-if="detail_pics[i]">
                            <img :src="src">
                            <span class="del" @click="detail_pics[i] = null">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </template>
                    </div>
                </div>

                <el-upload action="#" list-type="picture-card" :auto-upload="false" class="upload" multiple :limit="9"
                    :on-change="selectChange">
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="{ file }">
                        <div>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                    @click="handleDownload(file)">
                                    <el-icon>
                                        <Download />
                                    </el-icon>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </template>
        </mainPagePopup>

        <!-- 显示商品详情 -->
        <detailComp v-if="showDetail" :detail-info="detailData" :upHideDetail="upHideDetail"></detailComp>
    </div>
</template>

<style scoped lang='scss'>
:has(> .popup):after {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    background-color: #7f777742;
    z-index: 6;
}

.picture {
    /* width: 100%; */
    height: 60px
}

.detail_img {
    display: flex;
    margin: 10px 0;

    .box {
        width: 50px;
        margin: 0 8px;
        height: 50px;
        position: relative;

        .del {
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 50px;
            height: 50px;
            background-color: rgba(107, 107, 107, 0.404);
            line-height: 50px;
            color: white;
            text-align: center;
            font-weight: bold;
        }

        &:hover>.del {
            display: block;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>

<style lang="scss">
.upload {
    margin-bottom: 10px;
    width: 100%;

    .el-upload--picture-card,
    .el-upload-list__item {
        width: 50px;
        height: 50px;
    }

    ul {
        width: 100%;
    }
}
</style>
