<script setup lang="ts">
import { ref, watch } from 'vue'
import showMessage from '@/utils/showMessage';
import { queryGet, queryPost } from '@/service/modules/main';
import { Close } from '@element-plus/icons-vue'
import useUserInfoStore from './store';
import localCache from '@/utils/cache';
import useLoginStore from '@/store/modules/login';

const store = useUserInfoStore()

const _file: any = ref()
const _file_selected_name: any = ref('')
const reader = new FileReader() // 读取文件: 通过该构造对象中的方法可将文件渲染成 text 文本或 base64 等
const preview: any = ref('')

function selectChange(e: any) { // 监听 input file 中问价选择事件 change
    _file.value = e.target.files[0]

    const isLt2048Kb = _file.value.size / 1024 < 2048;

    if (!isLt2048Kb) { // 限制文件大小
        showMessage.error('图片大小不能超过 2M!');
        _file.value = null
    }

    _file_selected_name.value = _file.value?.name

    // 设置预览图 --> 数据
    reader.readAsDataURL(_file.value) // 将文件内容作为 DataURL --> 即 base 64
    reader.onloadend = () => { // 因为 reader 中的方法的渲染方法是异步的，所以这里需要通过 onloadend 事件，当 reader 渲染完后再执行某些操作
        preview.value = reader.result // 将 FileReader<reader> 中的结果存入 preview 中 --> reader 调用某一个读取方法时，会将结果存储到 reader 的 result 属性中
    }
}


async function uploadAvatar() {
    const _formData = new FormData() // 创建 FormData 类

    _formData.append('avatar', _file.value) // 写入 FormData 数据

    // console.log(_file.value)

    if (!_file.value) {
        showMessage.default("请先选择图像!")
        return
    }

    if (confirm("请再次确认修改头像!")) {
        const result = await queryPost("/file/avatar", _formData, { // 将 FormData 数据上传至服务器
            "Content-Type": "multipart/form-data"
        })

        store.queryUserInfo() // 更新数据

        store.upHideUploadAvart() // 隐藏修改头像表单

        showMessage.success("头像更新成功~")

        // 更新本地缓存与loginStore头像信息
        const userStore = useLoginStore()
        const avatarInfo = (await queryGet('/user/avatar', {})).data
        localCache.setCache("avatarInfo", avatarInfo)
        userStore.avatarInfo = avatarInfo
    }
}

</script>

<template>
    <div class="upload popup">
        <div class="show">
            <el-avatar shape="square" :size="80" :src="preview ? preview : '../../../src/assets/imgs/avarta.png'" />
            <span>头像预览</span>
        </div>

        <div class="content">

            <span class="selected" v-show="_file_selected_name && _file_selected_name !== ''">
                已选择 {{ _file_selected_name }}
            </span>
            <div class="select_file" @click.capture="console.log('select_file_patent')">
                <el-button type="primary" class="button">
                    <input type="file" @change="selectChange" accept="image/*">
                    选择文件
                </el-button>
            </div>
            <el-button type="success" class="button button2" @click="uploadAvatar">确认修改</el-button>
            <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
            </div>
        </div>

        <!-- 关闭按钮 -->
        <div class="close" @click="store.upHideUploadAvart()">
            <el-icon>
                <Close />
            </el-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.upload {
    position: fixed;
    /* inset: top right bottom left / inset: all */
    inset: 0;
    margin: auto;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
    height: fit-content;
    z-index: 8;
    max-width: 48vw;
    width: fit-content;

    .show {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-bottom: 20px;

        span {
            margin-top: 8px;
            font-size: 12px;
            color: #afafaf;
        }
    }

    .content {
        display: flex;
        flex-flow: column nowrap;

        & * {
            flex: 1;
        }

        .select_file {
            width: 100%;
            position: relative;

            input {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 0;
                left: 0;
                opacity: 0;
            }
        }

        .selected {
            font-size: 12px;
            color: #afafaf;
            margin-bottom: 5px;
        }

        .button {
            margin: 0;
            width: 100%;
        }

        .button2 {
            margin-top: 10px;
        }

    }

    .close {
        position: absolute;
        right: 6px;
        top: 6px;
        font-size: 22px;
        font-weight: bold;
        color: #f04949;
        z-index: 6;
    }
}
</style>

<style>
.upload .content .el-upload--text {
    width: 100%;
}
</style>
