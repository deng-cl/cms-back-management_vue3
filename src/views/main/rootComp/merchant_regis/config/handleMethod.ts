import type { SelectEnable } from "@/base-ui/h-table/h-table.vue";
import { queryPost } from "@/service/main/main";
import showMessage from "@/utils/showMessage";
import useTableConfig from "./useTableConfig";

export const selectEnable: SelectEnable = (row, rowIndex) => { // 用于决定左侧选框是否为可选状态
    if (row.state === 'true') { // 当该行 row 数据中的 state 为 true 时，即已经注册完成，左侧选框禁用
        return false
    }

    return true
}


const { payload, queryList } = useTableConfig()

export const registerMerchaantUserList = (selectedList: any[]) => { // 注册用户: selectedList 为所选中的用户列表 <单个/多个>

    if (selectedList?.length === 0) {
        showMessage.default("请先选择对应的用户!")
        return
    }

    if (!confirm("请再次确认批量注册用户操作!")) return // 二次确认: comfirm 确认弹窗

    const payload_list: any[] = []

    selectedList?.forEach(info => {
        const { id, nickname, sex, age, name, id_card, username, phone, password, shop_name } = info
        payload_list.push({ id, nickname, sex, age, name, id_card, username, phone, password, shop_name })
    })

    payload_list.forEach(async info => { // 批量注册
        const result = await queryPost("/user/registry/merchant", info)
        if (result.state !== 200) {
            showMessage.error(result.msg)
        }
        queryList(payload) // 注册完成后，更新列表数据
    })

    showMessage.success("注册成功")
}

export const registerMerchaantUser = async (userInfo: any) => { // <单个>

    if (!confirm(`请再次确认对${userInfo.username}用户注册操作!`)) return // 二次确认: comfirm 确认弹窗

    const { id, nickname, sex, age, name, id_card, username, phone, password, shop_name } = userInfo

    const regisInfo = { id, nickname, sex, age, name, id_card, username, phone, password, shop_name }

    const result = await queryPost("/user/registry/normal/to/merchant", regisInfo)

    if (result.state !== 200) {
        showMessage.error(result.msg)
    }

    queryList(payload) // 注册完成后，更新列表数据

    showMessage.success("注册成功")
}


