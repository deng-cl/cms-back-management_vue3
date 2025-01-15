<!--
    + 对 hForm 组件在进行常用功能的封装 -> 添加 header + footer 插槽<标题与按钮...>
    + 通过该组件的插槽，可以自定义标题名称
 -->
<script setup lang="ts">
import hFrom from '@/base-ui/h-form/h-from.vue';
import { Refresh, Search } from '@element-plus/icons-vue'

const props = defineProps<{
    formOptions: any,
    formData: any,
    search?: () => void,
    reset?: () => void
}>()

</script>

<template>
    <div class="search">
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <hFrom v-bind="props.formOptions" v-model="props.formData">
            <template #header>
                <div class="header">
                    <h1>
                        <slot>Small H Header</slot>
                    </h1>
                </div>
            </template>

            <template #footer>
                <div class="footer">
                    <el-button type="primary" :icon="Refresh" plain @click="reset">重置</el-button>
                    <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
                </div>
            </template>
        </hFrom>
    </div>
</template>

<style scoped lang="scss">
.search {
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
    padding-bottom: 20px;


    .header {
        color: #474747;
        font-size: 10px;
        margin-bottom: 28px;

        h1 {
            margin: 0;
            margin-bottom: 20px;
            font-weight: 500;
        }
    }

    .footer {
        text-align: right;
    }
}
</style>
