<script setup lang="ts">
import loginPanel from './conps/panel.vue';
</script>

<template>
    <div class="login fill">
        <div class="bg">
            <img class="image" src="../../assets/imgs/login-bg1.png" alt="login-background">
        </div>
        <loginPanel class="panel"></loginPanel>
    </div>
</template>

<style scoped lang="scss">
.login {
    background: linear-gradient(to right bottom, #ffcccc, #a9ffcd57);
    display: flex;
    /* justify-content: center; */
    align-items: center;
    background-clip: content-box;
    background: #001529;
    /* background: #001529 no-repeat 0 0/auto 100vh url("@/assets/imgs/login-bg.png"); */

    .bg {
        height: fit-content;
        width: fit-content;

        .image {
            height: 100vh;
            max-width: 60vw;
        }
    }

    .panel {
        width: 100%;
        padding: 0 80px;
        box-sizing: box-border;
        margin: 0 auto;
    }
}
</style>
