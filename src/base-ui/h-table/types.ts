export interface TableEventType {
    // 其它事件类型，需要使用到时再到 element-plus 中查看对应的事件....
    selectionChange: (newSelection: any[]) => void
}

interface PaginationPropConfig {
    total: number // 列表数据总数
    size: number // 一页显示的数据量
    currentPage: number // 当前页
}

interface PaginationEventConfig {
    currentChange: (pageCount: any, payload: any) => void // 监听当前页事件 <分页跳转事件> --> payload 参数: 模糊查询参数
    sizeChange: (size: any) => void // 监听选择一页展示多少数据事件 <单页展示数据量>
}

export interface PaginationConfig {
    // 分页组件配置选项
    prop: PaginationPropConfig
    event: PaginationEventConfig
}

export type SelectEnable = (row: any, rowIndex: any) => boolean
