<script setup lang="ts">

</script>

<template>
    <h1 class="title">
        <slot>Default Title</slot>
    </h1>
</template>

<style scoped>
h1 {
    margin: 0;
}

.title {
    font-size: 18px;
    font-weight: 500;
    color: #303133a6;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    align-items: center;
}
</style>
