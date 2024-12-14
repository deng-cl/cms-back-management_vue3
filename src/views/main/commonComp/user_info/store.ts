import { defineStore } from "pinia";
import localCache from "@/utils/cache";
import { ref } from "vue";
import { queryGet } from "@/service/main/main";

const useUserInfoStore = defineStore("user_info", () => {

    // 用户基本信息 -----------------------------------------------
    const userInfo = ref() // 存储用户信息

    const queryUserInfo = async () => { // 获取/更新下用户信息
        const result = await queryGet('/user/userinfo/' + localCache.getCache('userId'), {}) // 请求用户信息数据

        userInfo.value = result.data[0] // 更新用户信息

        return result.data[0]
    }

    // 修改用户信息表单 popup
    const showPopupForm = ref(false) // 存储用户信
    const upHidePopupForm = () => showPopupForm.value = false
    const upShowPopupForm = () => showPopupForm.value = true


    // 头像信息 -----------------------------------------------
    const showUploadAvart = ref(false)
    const upHideUploadAvart = () => showUploadAvart.value = false
    const upShowUploadAvart = () => showUploadAvart.value = true

    return {
        userInfo,
        queryUserInfo,
        showPopupForm,
        upHidePopupForm,
        upShowPopupForm,

        showUploadAvart,
        upHideUploadAvart,
        upShowUploadAvart
    }

})

export default useUserInfoStore
