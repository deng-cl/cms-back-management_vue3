export interface HeaderItemOfOverview {
    title: string
    value: number | string
    icon: any,
    style?: number
    animation?: boolean
}
export interface HeaderConfigOfOverView {
    title: string,
    items: HeaderItemOfOverview[]
}


