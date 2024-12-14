import HRequest from "./request";
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from "@/utils/cache";

const hRequest = new HRequest({ // 配置封装的当前 axios 实例的默认参数
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor(config) {
            // 携带 token 的拦截
            const token = localCache.getCache("token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }
    }
})

export default hRequest


