import useLoginStore from '@/store/modules/login'
import localCache from './cache'

export const getBreadcrumbDate = (path: string) => {
    let childIndex: number = 0
    const result = useLoginStore()?.menuList?.find((item) => {
        return item.children.find((child, i) => {
            childIndex = i
            return child.path === path
        })
    })

    return [
        {
            title: result?.parent_title,
            path: ''
        },
        {
            title: result?.children[childIndex].title,
            path: '/' + result?.children[childIndex].path
        }
    ]
}

export function handleMenuDataList(menuData: any[]) {
    // 🔺该函数用于处理 Menu 菜单列表的数据 --> 将服务器响应的菜单数据转换成方便客户端在 table 中展示的数据 <Menu 组件等页使用>
    const menuList: any[] = []

    menuData.forEach((info) => {
        // 一级
        const menu: any = {
            title: info.parent_title,
            icon: info.icon,
            children: []
        }

        info?.children.forEach((child: any) => {
            // 二级
            const permission: any[] = []

            if (child?.permission) {
                Object.keys(child.permission).forEach((key) => {
                    // 三级
                    permission.push({
                        title: child.permission[key].name,
                        permission: child.permission[key].msg
                    })
                })
            }

            menu.children.push({
                title: child.title,
                path: child.path,
                children: permission
            })
        })

        menuList.push(menu)
    })

    return menuList
}

export function getButtonPermissionAllByMenu(formatedMenuData: any) {
    // 根据 Menu 列表获取，遍历出所有按钮权限 <该用户所有按钮权限> --> formatedMenuData 格式化后的 Menu 列表 <即 ↑ handleMenuDataList 后的 Menu 列表>
    const permissionAll: any[] = [] // 用户所有按钮权限啊

    if (formatedMenuData?.length !== 0) {
        try {
            formatedMenuData.forEach((item: any) => {
                item.children.forEach((nav_info: any) => {
                    nav_info.children.forEach((permission: any) => {
                        permissionAll.push(permission.permission)
                    })
                })
            })
        } catch (e) {
            console.log('@/utils/mapMenu.ts', e)
        }
    }

    return permissionAll
}

export function isExitsPermission(permission: string) {
    // 根据权限字段 permission 判断用户是否存在对应的该 permission 权限 <根据 buttonPermission 进行判断>
    const buttonPermission = localCache.getCache('buttonPermission') as any[]

    return buttonPermission.includes(permission)
}
