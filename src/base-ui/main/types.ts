import type { FormItemRule } from 'element-plus'

type PopupFormType =
    | 'input'
    | 'password'
    | 'checkbox'
    | 'radio'
    | 'number'
    | 'input-number'
    | 'select'
    | 'switch'
    | 'upload' // 所封装的表单列表

export interface SelectOptionType {
    // 针对 select 的主要依赖配置项类型
    label: string
    value: string | number | undefined
}

export interface RadioOptionType {
    // 针对 radio 的主要依赖配置项类型
    label: string
    value: string | undefined
}

export interface PopupFormItem {
    // 🔺单个表单项的配置
    /* 表单类型 */ type: PopupFormType
    /* 表单文字描述 */ label: string
    /* 表单关联字段<v-model> */ field: string
    /* placeholder */ placeholder?: string
    /* 表单校验规则 */ rules?: FormItemRule
    /* 针对表单 select 类型的主要配置项 options */ selectOptions?: SelectOptionType[]
    /* 针对表单 radio 类型的主要配置项 */ radioOptions?: RadioOptionType[]
    /* 其它配置项 --> 如: 某个 ui 组件的其它配置项等配置 */ orhterOptions?: any
}

interface IColLayoutItem {
    span?: number
    offset?: number
    pull?: number
    push?: number
}

export interface IColLayout {
    xs?: IColLayoutItem // 	<768px
    sm?: IColLayoutItem // ≥768px
    md?: IColLayoutItem // ≥992px
    lg?: IColLayoutItem // ≥1200px
    xl?: IColLayoutItem // ≥1920px
}

export interface PopupForm {
    /* 🔺整个 hForm 自定义表单的配置项整合 */
    formItems: PopupFormItem[] // 使用组件时，接收一个对应的表单配置属性
    labelWidth?: string
    itemStyle?: any
    colLayout?: IColLayout // 用于定义响应式表单 <可以理解为是媒体查询>
}
