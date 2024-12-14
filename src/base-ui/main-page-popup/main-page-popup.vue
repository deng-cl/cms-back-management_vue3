<script setup lang="ts">
import type { PopupForm } from './types';
import hFrom from '../h-form/h-from.vue';

export interface PopupFooterConfig {
    confirmTitle: string | any
    cancelTitle: string | any
    confirmEvent: (popupFormData: any) => any | void
    cancelEvent: () => any | void
}

export interface PopupConfig {
    popupTitle?: any
    popupFormConfig: PopupForm
    popupFormData: any,
    popupFooterConfig?: PopupFooterConfig
    style?: any
}

const props = withDefaults( // form 表单属性拦截
    defineProps<PopupConfig>(),
    {
        popupTitle: "popup form 默认标题 <请通过 titel 属性进行自定义 popup 标题>",
        popupFormData: null,
        style: null
    }
)

</script>

<template>
    <div class="popup" :style="style">
        <h1 class="title">{{ popupTitle }}</h1>
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <hFrom v-bind="props.popupFormConfig" v-model="props.popupFormData"></hFrom>

        <slot name="custom_slot"></slot>

        <!-- 定义底部按钮 -->
        <div class="footer">
            <slot name="footer">
                <el-button type="danger" @click="popupFooterConfig?.cancelEvent">{{
        popupFooterConfig?.cancelTitle ??
        '取消' }}</el-button>
                <el-button type="primary" @click="popupFooterConfig?.confirmEvent(popupFormData)">{{
        popupFooterConfig?.confirmTitle
                    ?? '确认' }}</el-button>
            </slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.popup {
    position: fixed;
    inset: 0;
    margin: auto;
    background-color: white;
    border-radius: 6px;
    padding: 20px;
    height: fit-content;
    z-index: 8;
    max-width: 45vw;
    width: fit-content;
    box-shadow: 1px 1px 28px rgb(94 94 94 / 28%);

    .title {
        margin: 0;
        font-size: 16px;
        text-align: center;
    }

    .footer {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        padding: 0 20px;
        box-sizing: border-box;

        .el-button {
            /* flex: 1; */
        }
    }
}
</style>
