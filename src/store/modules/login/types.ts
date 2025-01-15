import { type Ref } from 'vue'

export interface MenuChildrenType {
    path: string
    title: string
}

export interface MenuListType {
    id: number
    children: MenuChildrenType[]
    parent_title: string
}

export interface LoginStoreType {
    token: Ref<string>
    username: Ref<string>
    isSavePass: Ref<boolean>
    userId: Ref<number>
    user_type_id: Ref<any>
    menuList: Ref<MenuListType[] | null | undefined>
    breadcrumb: Ref<any[]>
    upBreadcrumb: (path: string) => void
    submitAccountLogin: (payload: any) => void
    submitPhoneLogin: (payload: any) => void
    formatedMenuList: any
    buttonPermission: any
    avatarInfo: any
}
