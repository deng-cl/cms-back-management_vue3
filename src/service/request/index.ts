import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios"
import { ElLoading } from 'element-plus' /* 引入 element-plus 中的 loading 组件: 以服务的方式来调用 ElLoading  */
import "element-plus/theme-chalk/el-loading.css" /* 引入对应组件的 css 样式 <因为是以服务的方式进行引入的，所以不会想组件那样可以自动引入> */
import type { HRequestInterceptors, HRequestConfig } from "./types" /* 类型扩展 */

const DEFAULT_LOADING = (showLoading: boolean | undefined) => String(showLoading) === 'undefined' ? true : showLoading /* 默认 loading: true 代码抽取 <因为每个请求方法都需要对 showLoading 的赋值与定义默认 loading，所以进行该行代码的抽取> */

class HRequest { // H: 个人昵称
    instance: AxiosInstance
    interceptors: Partial<HRequestInterceptors> | undefined /* Partial: 统一转换可选类型 */
    loading: any /* 用于 ElLoading.service 返回的 Loading 实例，可以通过该实例的 close 方法进行关闭该 loading 效果 */
    showLoading: boolean | undefined

    constructor(config: /* HRequestConfig: 对原来的 axios 中的 AxiosRequestConfig 接口进行扩展*/ HRequestConfig) {
        this.instance = axios.create(config) /* 每次 new HRquest 时，都是一个独立的 axios 实例供下面所要封装的请求方法使用 <业务需要可能要创建多个 instance 实例: 如当项目中需要使用多个请求 baseURL 时> */
        this.showLoading = DEFAULT_LOADING(config.showLoading)  /* 默认显示 loading */

        /* 实例拦截器 <对当前实例所有方法都会生效>: 调用自定义拦截器 Hooks : 创建 HRequest 实例或使用下面实例封装的方法时可自定义配置拦截器 hooks 来做对应的拦截操作 */
        this.interceptors = config.interceptors /* 获取 config 中拦截器参数 hooks */
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        /* 全局拦截器 <对所有 HRequest 实例中的所有方法都会生效>: 通过直接添加 this.instance.interceptors.request.use 里面对应的拦截方法，来配置每一个 HRequest 实例都有的拦截器 <人话: 直接在实例中写死的拦截器方法> */
        this.instance.interceptors.request.use(
            config => {
                if (this.showLoading) {
                    this.loading = ElLoading.service({ /* 添加 loading 效果 */
                        lock: true,
                        text: "loading..."
                    })
                }
                return config
            },
        )
        this.instance.interceptors.response.use(
            config => {
                if (this.showLoading) { this.loading?.close() } /* 移除 loading */

                if (config.data?.returnCode === '-1001') { /* 处理服务器响应错误信息时: returnCode 属性需要根据对应服务器响应数据的格式决定 <如服务器返回响应信息的格式中状态码也可能时 status|code 等属性进行响应> */
                    console.log("处理对应的错误信息")
                }

                return config.data /* 响应拦截: 只返回服务器所响应的数据 */
            },
            err => { /* 请求失败响应拦截，处理全局请求失败的逻辑 */
                if (this.showLoading) { this.loading?.close() } /* 移除 loading */

                if (err.response?.status === 404) {
                    console.log("404错误~");
                }
                /* oether error handle */
            }
        )
    }

    request<R>(config: HRequestConfig<R>): Promise<R> {
        this.showLoading = DEFAULT_LOADING(config.showLoading) /* 配置是否需要小时 loading: 默认显示 loading */

        if (config?.interceptors?.requestInterceptor) {  /* 局部请求拦截器 */
            config = config.interceptors.requestInterceptor(config as InternalAxiosRequestConfig /* 通过类型断言进行类型范围延申，使其符合对应的拦截器类型 */)
        }

        return this.instance.request<any, R>(config).then(res => { /* 通过实例中的 instance/axios 实例，来进行对应请求的封装 */
            if (config?.interceptors?.responseInterceptor) {  /* 局部响应拦截器 */
                res = config.interceptors.responseInterceptor(res) /* 将最终的 res 断言成 R 类型 */
            }
            return res
        })
    }

    get<R>(config: HRequestConfig<R>): Promise<R> {
        return this.request<R>({ ...config, method: "GET" })
    }

    post<R>(config: HRequestConfig<R>): Promise<R> {
        return this.request<R>({ ...config, method: "POST" })
    }

    delete<R>(config: HRequestConfig<R>): Promise<R> {
        return this.request<R>({ ...config, method: "DELETE" })
    }

    patch<R>(config: HRequestConfig<R>): Promise<R> {
        return this.request<R>({ ...config, method: "PATCH" })
    }

    put<R>(config: HRequestConfig<R>): Promise<R> {
        return this.request<R>({ ...config, method: "PUT" })
    }
}

export default HRequest

