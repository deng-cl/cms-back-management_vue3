import type { FormItemRule } from "element-plus"

export type IType = 'input' | 'password' | 'select' | 'piker' | 'number' | 'switch' | 'radio' | 'select'
export interface IOptions { // select options
    label: string
    value: string | number | undefined
}
export interface ROptions {
    id: number
    label: string
    value: string | undefined
}

export interface IFormItem {
    type: IType
    label: string
    field: string
    placeholder?: string
    rules?: FormItemRule,
    selectOptions?: IOptions[] // 针对 select: 当 type 为 select 时，需要对应的 option 数据
    radioOptions?: ROptions[] // 针对 radio: 当 type 为 radio 时，对应的选项数据
    orhterOptions?: any // 针对其它配置项 --> 如: 某个 ui 组件的其它配置项等配置
}



export interface IColLayoutItem {
    span?: number,
    offset?: number,
    pull?: number,
    push?: number
}
export interface IColLayout {
    xs?: IColLayoutItem // 	<768px
    sm?: IColLayoutItem // ≥768px
    md?: IColLayoutItem // ≥992px
    lg?: IColLayoutItem // ≥1200px
    xl?: IColLayoutItem // ≥1920px
}


export interface IForm { /* 🔺整个 hForm 自定义表单的配置项整合 */
    formItems: IFormItem[], // 使用组件时，接收一个对应的表单配置属性
    labelWidth?: string,
    itemStyle?: any,
    colLayout?: IColLayout
}


// export interface TableConfig {
//     prop?: string
//     label: string
//     slotName?: string
//     width:string
// }
