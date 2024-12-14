/* 封装 axios 的类型抽取 */
import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios"

export interface HRequestInterceptors<T = AxiosResponse> { /* 定义 HRequestInterceptors 接口: 用于扩展 axios 中的 config 的 AxiosRequestConfig，扩展 axios 拦截器参数 */
    requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorCatch: (error: any) => any
    responseInterceptor: (config: T) => T
    responseInterceptorCatch: (error: any) => any
}

export interface HRequestConfig<T = AxiosResponse> extends AxiosRequestConfig { /* 定义 HRequestConfig 接口: 用于管理 axios 封装中的 config 参数类型接口 --> 扩展接口....*/
    interceptors?: /* Partial: 统一转换可选类型 */ Partial<HRequestInterceptors<T>> /* 扩展 interceptors 拦截器属性: 对应原有的 axios config 中的 AxiosRequestConfig 类型进行扩展 */
    showLoading?: boolean | undefined /* 扩展用户可选是否需要显示加载 loading 效果 */
}

