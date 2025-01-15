<script setup lang="ts">
import mainPagePopup from '@/base-ui/main/h-popup.vue';
import uploadAvartComp from './upload_avart_comp.vue'

import { EditPen, User, Male, Female, Star, Phone, Shop, Timer, Watch, Refresh, InfoFilled } from '@element-plus/icons-vue'
import useUserInfoStore from './store'
import { formatUTCString } from '@/utils/format'; // 时间格式化工具
import usePopupConfig from './config/usePopupConfig';
import { computed } from 'vue';

// "createAt": "2024-03-16T03:25:12.000Z", --> 🔺国际时间比北京时间慢 16 个小时

const store = useUserInfoStore()

await store.queryUserInfo() // 请求数据

const userInfo = computed(() => store.userInfo) // 拿到 userInfo 数据

const {
    showPopup,
    popupFormConfig,
    popupFooterConfig,
    popupFormData
} = usePopupConfig() // 获取 popupConfig 配置项

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

</script>

<template>
    <div class="user_info">
        <!-- 修改基本信息，弹出层 -->
        <mainPagePopup v-if="showPopup" popup-title="修改用户基本信息" :popup-form-config="popupFormConfig"
            :popup-footer-config="popupFooterConfig" :popup-form-data="popupFormData"></mainPagePopup>

        <!-- 修改头像 -->
        <uploadAvartComp v-if="store.showUploadAvart"></uploadAvartComp>

        <div class="base">
            <h2 class="title">基本信息</h2>
            <div class="content">
                <div class="avart">
                    <el-avatar shape="square" :size="120"
                        :src="userInfo.avatar_url ? BASE_URL + userInfo.avatar_url : `${BASE_URL}/images/default_avart.jpg`"
                        alt="头像异常，请重新上传" />
                    <el-button class="up_avart_btn" type="primary" link @click="store.upShowUploadAvart">
                        <el-icon class="icon">
                            <EditPen />
                        </el-icon>
                        修改头像
                    </el-button>
                </div>

                <div class="info">
                    <div class="row">
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <User />
                                </el-icon>姓名:
                            </span>
                            {{ userInfo?.name }}
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Male v-if="true" />
                                    <Female v-else />
                                </el-icon>性别:
                            </span>
                            {{ userInfo?.sex }}
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Star />
                                </el-icon>年龄:
                            </span>
                            {{ userInfo?.age }}
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Phone />
                                </el-icon>电话:
                            </span>
                            {{ userInfo?.phone }}
                        </p>
                    </div>


                    <div class="row">
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <User />
                                </el-icon>用户账号:
                            </span>
                            {{ userInfo?.username }}
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Star />
                                </el-icon>昵称:
                            </span>
                            {{ userInfo?.nickname }}
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Shop />
                                </el-icon>店铺名称:
                            </span>
                            <span class="no">{{ userInfo?.shop_name ? userInfo?.shop_name : '无' }}</span>
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <InfoFilled />
                                </el-icon>ID_Card:
                            </span>
                            <span class="no">{{ userInfo?.shop_name ? userInfo?.shop_name : '无' }}</span>
                        </p>
                    </div>

                    <div class="row">
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Timer />
                                </el-icon>创建时间:
                            </span>
                            {{ formatUTCString(userInfo?.createAt, "YY[年]MM[月]DD[日] HH:mm:ss") }}
                        </p>
                        <p>
                            <span class="title">
                                <el-icon class=" icon">
                                    <Refresh />
                                </el-icon>修改时间:
                            </span>
                            {{ formatUTCString(userInfo?.updateAt, "YY[年]MM[月]DD[日] HH:mm:ss") }}
                        </p>
                    </div>

                    <el-button type="primary" class="up_info_btn" @click="store.upShowPopupForm">修改基本信息</el-button>
                </div>
            </div>
        </div>

        <div class="orther">
            <h2 class="title">Other...</h2>
        </div>

    </div>
</template>

<style scoped lang="scss">
.user_info {

    .base,
    .orther {
        padding: 20px;

        .title {
            margin: 0;
            margin-bottom: 20px;
            font-size: 16px;
            /* color: #001529; */
            color: #00152996;
        }

        .content {
            box-sizing: border-box;
            padding-left: 20px;
            display: flex;
            flex-flow: row nowrap;

            .icon {
                margin-right: 5px;
            }

            .avart {
                display: flex;
                flex-flow: column nowrap;
                width: 120px;

                .up_avart_btn {
                    margin-top: 10px;
                }
            }

            .info {
                margin-left: 30px;
                position: relative;
                display: flex;
                justify-content: space-between;
                flex: 1;

                .row {
                    margin-right: 30px;

                    p {
                        margin: 0;
                        font-size: 16px;
                        display: flex;

                        .title {
                            color: #00152996;
                            display: flex;
                            align-items: center;
                            margin-right: 10px;
                        }

                        .no {
                            color: #00152996;
                        }
                    }
                }

                .up_info_btn {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
        }
    }
}

:has(> .popup):after {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    background-color: #7f777742;
    z-index: 6;
}
</style>
