<script setup lang="ts">

defineProps<{
    data: any
}>()

</script>

<template>

    <table>
        <tr v-for="(value, key, i) in data" :key="i">
            <td class="name">{{ key }}</td>
            <td>
                <el-text type="primary" style="padding-left: 5px;"> {{ value }}</el-text>
            </td>
        </tr>
    </table>
</template>

<style scoped lang="scss">
table {
    border-collapse: collapse;
    border: 1px solid rgba(196, 196, 196, 0.205);
    font-family: sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
    width: 100%;

    tr {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;

        .name {
            background-color: #f4f4f4;
        }

        td {
            border: 1px solid rgb(230, 228, 228);
            padding: 8px 10px;
            flex: 1;
        }

    }
}
</style>
