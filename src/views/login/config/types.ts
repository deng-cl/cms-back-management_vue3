export interface AccountRuleForm {
    name: string
    pass: string
}

export interface PhoneRuleForm {
    phone: string
    veriCode: string
}

export interface LoginResType {
    id: number
    msg: string
    phone: string
    state: number
    token: string
    user_type_id: string
    username: string
}

export interface ChildrenType {
    title: string
    path: string
}

export interface MenuListType {
    id: number;
    children: ChildrenType[];
    parent_title: string;
    icon?: string;
}

export interface MenuData {
    menu_list: MenuListType;
}

export interface MenuResType {
    state: number;
    msg: string;
    data: MenuData[];
}
