<script setup lang="ts">
import { ref } from 'vue'
import type { HeaderConfigOfOverView } from './config/types';
import CountUp from 'vue-countup-v3' // -- 数字动画库
import { onMounted } from 'vue';

defineProps<{
    headerConfig: HeaderConfigOfOverView
}>()

const ITEM_STYLE = [ // 总览背景颜色配置
    { // - 0
        box: { background: '#73c1ff' },
        icon: {
            backgroundColor: 'rgb(72 157 244)',
            filter: 'drop-shadow(1px 2px 3px rgb(72 157 244))'
        }
    },
    {
        box: { background: 'rgb(255 172 115)' },
        icon: {
            backgroundColor: 'rgb(240 143 78)',
            filter: 'drop-shadow(1px 2px 3px rgb(240 143 78))'
        }
    },
    {
        box: { background: 'rgb(111 226 149)' },
        icon: {
            backgroundColor: 'rgb(57, 225, 113)',
            filter: 'drop-shadow(1px 2px 3px rgb(57, 225, 113))'
        }
    },
    {
        box: { background: 'rgb(255 115 115)' },
        icon: {
            backgroundColor: 'rgb(238 85 85)',
            filter: 'drop-shadow(1px 2px 3px rgb(238 85 85))'
        }
    },
    {
        box: { background: 'rgb(181 181 181)' },
        icon: {
            backgroundColor: 'rgb(148 148 148)',
            filter: 'drop-shadow(1px 2px 3px rgb(148 148 148))'
        }
    },
    { // -- 5
        box: { background: 'rgb(111 178 226)' },
        icon: {
            backgroundColor: 'rgb(92 173 230)',
            filter: 'drop-shadow(1px 2px 3px rgb(92 173 230))'
        }
    },
    {
        box: { background: 'rgb(111 226 149)' },
        icon: {
            backgroundColor: 'rgb(57, 225, 113)',
            filter: 'drop-shadow(1px 2px 3px rgb(57, 225, 113))'
        }
    },
    {
        box: { background: 'rgb(255 172 115)' },
        icon: {
            backgroundColor: 'rgb(240 143 78)',
            filter: 'drop-shadow(1px 2px 3px rgb(240 143 78))'
        }
    },
    {
        box: { background: 'rgb(255 115 115)' },
        icon: {
            backgroundColor: 'rgb(238 85 85)',
            filter: 'drop-shadow(1px 2px 3px rgb(238 85 85))'
        }
    }
]

</script>
<template>
    <div class="header">

        <h1 class="title">
            <!-- <el-text size="large" type="primary">{{ headerConfig.title ? headerConfig.title : 'Header Default Tiltle'
                }}</el-text> -->
            {{ headerConfig.title ? headerConfig.title : 'Header Default Tiltle'
            }}
        </h1>
        <ul>
            <template v-for="(item, i) in  headerConfig.items " :key="i">
                <li class="box" :style="ITEM_STYLE[item.style ?? i as any as number]?.box">
                    <el-icon class="icon" :style="ITEM_STYLE[item.style ?? i as any as number]?.icon">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <div class="value">
                        <CountUp v-if="item.animation" :end-val="Number(item.value)" class="text" :duration=".8"
                            :decimalPlaces="2">
                            <template #prefix>￥</template>
                        </CountUp>
                        <span v-else class="text">{{ item.value }}</span>
                        <h2>{{ item.title }}</h2>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>


<style scoped lang="scss">
.header {
    padding: 0 20px;
    box-sizing: border-box;

    .title {
        margin-bottom: 0;
        color: #878787;
        font-weight: 500;
        font-size: 20px;

    }

    ul {
        user-select: none;
        display: flex;
        flex-flow: row nowrap;
        list-style: none;
        flex-wrap: wrap;
        padding-left: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 22px;

        &>* {
            flex: 1;
            transition: 200ms ease;
        }

        li:hover {
            box-shadow: 1px 1px 8px 1px #c5c5c5;
            transform: translateX(1px) translateY(-1px);
        }

        .box {
            height: 100%;
            background: orange;
            color: white;
            border-radius: 8px;
            box-sizing: border-box;
            padding: 20px;
            /* margin: 0 20px; */
            height: max-content;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .icon {
                font-size: 20px;
                width: 40px;
                height: 40px;
                border-radius: 5px;
                box-shadow: inset 1px 1px 20px white;
            }

            .value {
                text-align: center;

                .text {
                    text-align: center;
                    font-weight: bold;
                    font-size: 24px;
                }

                .countup {
                    cursor: pointer;
                }

                h2 {
                    margin: 0;
                    flex-grow: 1;
                    margin: 0 10px;
                    font-size: 16px;
                    font-weight: 500;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
