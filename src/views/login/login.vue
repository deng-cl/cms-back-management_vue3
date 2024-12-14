<script setup lang="ts">
import loginPanel from './conps/login-panel.vue';
</script>

<template>
    <div class="login fill">
        <loginPanel></loginPanel>
    </div>
</template>

<style scoped lang="scss">
.login {
    background: linear-gradient(to right bottom, #ccfaff69, #a9ffcd57);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
