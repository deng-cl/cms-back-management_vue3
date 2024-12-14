export { }

export type FormatDateByTyps = ( // 时间格式化类型定义
    "YYYY-MM-DD" | "YYYY/MM/DD" | "YYYY-MM-DD HH:mm:ss" | "YYYY/MM/DD HH:mm" | "YYYY-MM-DD HH:mm" | "YYYY/MM/DD HH:mm" |
    "HH:mm:ss" | "HH:mm" |
    "YYYY[年]MM[月]DD[日]" | "YY[年]MM[月]DD[日]" |
    "YYYY[年]MM[月]DD[日] HH:mm:ss" | "YY[年]MM[月]DD[日] HH:mm:ss"
)

interface FilterType { // app 全局自定义属性 $filter 属性类型
    formatUTCString: (UTC_DATE: string, FORMAT_TYPE: FormatDateByTyps) => string
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $filters: FilterType,
        $parent: any
    }

}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
    const zhLocale: any;
    export default zhLocale;
}

declare module 'element-plus/dist/locale/en.mjs' {
    const enLocale: any;
    export default enLocale;
}
