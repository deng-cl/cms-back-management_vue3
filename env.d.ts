/// <reference types="vite/client" />

interface ImportMetaEnv { // 配置 vite 环境变量 ts 的代码提示
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_TIME_OUT: number

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

