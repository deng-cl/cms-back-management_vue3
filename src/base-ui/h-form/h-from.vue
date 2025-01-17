<!-- 🔺h-form 高阶组件封装
    + formItems -> 配置表单项
    + labelWidth -> 配置 label 宽度
    + itemStyle -> 配置 form-item 自定义样式
    + colLayout -> 配置响应式表单
 -->
<script setup lang="ts">
import type { PopupFormItem } from '@/base-ui/main/types';
import type { IColLayout, IFormItem } from './types'

withDefaults( /* withDefaults 宏 --> 用于给 ts 方式的 defineProps 定义默认值 */
    defineProps<{ /* 属性拦截 --> 通过传入不同的配置属性，来定义不同需求的 form 表单 */
        formItems: IFormItem[] | PopupFormItem[], // 使用组件时，接收一个对应的表单配置属性
        labelWidth?: string,
        itemStyle?: any,
        colLayout?: IColLayout
        position?: 'right' | 'left'
    }>(),
    {
        labelWidth: "auto",
        itemStyle() {
            return {/* default itemStyle */ }
        },
        colLayout() {
            return { // 定义表单响应式
                xl: { span: 6 },
                lg: { span: 8 },
                md: { span: 12 },
                sm: { span: 24 },
                xs: { span: 24 },
            }
        },
        position: 'right'
    }
)

const model: any = defineModel() // v-model 数据
</script>

<template>
    <div class="h-form">
        <slot name="header"></slot>

        <el-form :label-width="labelWidth" :label-position="position" :model="model">
            <el-row :gutter="20">
                <template v-for="(item, i) in  formItems" :key="i">
                    <el-col v-bind="colLayout">
                        <el-form-item :label="item.label" :prop="item.field" :rules="[item.rules ? item.rules : '']"
                            class="form-item" :style="itemStyle">
                            <template
                                v-if="item.type === 'input' || item.type === 'password' || item.type === 'number'">
                                <el-input :type="item.type" :show-password="item.type === 'password'"
                                    :placeholder="item.placeholder" v-bind="item.orhterOptions"
                                    v-model="model[`${item.field}`]" />
                            </template>

                            <template v-if="item.type === 'switch'">
                                <el-switch v-model="model[`${item.field}`]" width="fit-content"
                                    v-bind="item.orhterOptions" />
                            </template>

                            <template v-if="item.type === 'select'">
                                <el-select style="width: 100%;" :placeholder="item.placeholder"
                                    v-bind="item.orhterOptions" v-model="model[`${item.field}`]">
                                    <el-option v-for="option in item.selectOptions" :key="option.value"
                                        :value="option.value">{{ option.label }}</el-option>
                                </el-select>
                            </template>

                            <template v-if="item.type === 'radio'">
                                <el-radio-group v-model="model[`${item.field}`]">
                                    <el-radio-button v-for="radioOption in item.radioOptions" :key="radioOption.value"
                                        v-bind="radioOption" />
                                </el-radio-group>
                            </template>

                            <template v-if="item.type === 'piker'">
                                <el-date-picker type="date" :placeholder="item.placeholder" v-bind="item.orhterOptions"
                                    v-model="model[`${item.field}`]" style="width: 100%;" :validate-event="false" />
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>

        <slot name="footer"></slot>
    </div>
</template>

<style scoped lang="scss">
.h-form {
    box-sizing: border-box;
    padding-top: 22px;
}
</style>

<style></style>
