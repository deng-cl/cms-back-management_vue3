import "normalize.css" /* 引入 css 重置样式 */
import "./assets/css/index.scss" /* 自定义公共样式 */

import { createApp } from 'vue'
import AppComp from './App.vue'

import router from "./router"
import pinia from './store'
import 'element-plus/dist/index.css'
import localCache from "./utils/cache"
import useLoginStore from "./store/login/login"
import { addGlobalProperties } from "./global"

const app = createApp(AppComp)

app.config.warnHandler = () => null // 关闭警告提示

app.use(router)
app.use(pinia)

// 首次进入页面 -- 判断书否为登录状态 -- 赋值至 login pinia store 中
const loginStore = useLoginStore()
loginStore.token = localCache.getCache("token")
loginStore.userId = localCache.getCache("userId")
loginStore.user_type_id = localCache.getCache("user_type_id")
loginStore.menuList = localCache.getCache("menuList")
loginStore.username = localCache.getCache("username")
loginStore.formatedMenuList = localCache.getCache("formatedMenuList")
loginStore.buttonPermission = localCache.getCache("buttonPermission")
loginStore.avatarInfo = localCache.getCache("avatarInfo")

// app 全局自定义属性
addGlobalProperties(app)

app.mount('#app')
