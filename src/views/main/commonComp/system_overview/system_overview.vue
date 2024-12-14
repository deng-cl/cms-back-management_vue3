<script setup lang="ts">
import systemTitle from './system-title.vue'
import systemTable from './system-table.vue'
import useConfig from './config'

const {
    useToll,
    dependencies,
    devDependencies,
    dirs,
    standard_git
} = useConfig()


</script>

<template>
    <div class="system-overview">
        <h1 class="title" style="text-align: center; margin: 5px 0;">
            <el-text type="primary" size="large">系统总览</el-text>
        </h1>

        <div class="use-toll">
            <systemTitle>技术栈</systemTitle>
            <div class="content">
                <ul>
                    <li v-for="(item, i) in useToll" :key="i">
                        <span class='F'>{{ item.name }}</span>: <el-text type="primary"> {{ item.value }}</el-text>
                    </li>
                </ul>
            </div>
        </div>

        <div class="dependencies">
            <systemTitle>生产依赖</systemTitle>
            <div class="content">
                <systemTable :data="dependencies"></systemTable>
            </div>
        </div>

        <div class="dev-dependencies">
            <systemTitle>开发依赖</systemTitle>
            <div class="content">
                <systemTable :data="devDependencies"></systemTable>
            </div>
        </div>

        <div class="dir cut">
            <systemTitle>目录解构</systemTitle>
            <div class="content">
                <pre class="dirs">
                    {{ dirs }}
                </pre>
            </div>
        </div>

        <div class="standard cut">
            <systemTitle>Git 提交规范</systemTitle>
            <div class="content after">
                <systemTable :data="standard_git"></systemTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.system-overview {
    color: #001529;
    margin-bottom: 10px;
    padding-top: 5px;

    .content {
        padding: 0 20px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .use-toll {
        .content {
            ul {
                list-style-position: inside;
                padding: 0;

                li {
                    margin: 10px 0;
                }
            }
        }
    }

    .cut {
        border-top: 20px solid #f5f5f5;
    }

    .dirs {
        background-color: #f4f4f4;
        border-radius: 2px;
    }

    .after {
        padding-bottom: 5px;
    }
}
</style>
