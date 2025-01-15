import { queryGet, queryPost, queryPut } from '@/service/modules/main'
import showMessage from '@/utils/showMessage'
import useTableConfig from './useTableConfig'
import useTagStore from '../store'
import rules, { RULE_TEST_FUN } from '@/global/form-rules'

const store = useTagStore()
const { queryList, payload } = useTableConfig() // 在 useTableConfig 中获取数据请求方法与参数

export async function createPopupComfirm() {
    // 🔺新建商品标签

    const formData = store.popupFormData // 获取 popup 表单要提交的数据 formData

    if (!formData.tag) {
        showMessage.default('标签名不能为空')
        return
    }

    if (!formData.msg) {
        showMessage.default('标签名描述不能为空')
        return
    }

    if (!RULE_TEST_FUN(rules.tag_name, formData.tag) || !RULE_TEST_FUN(rules.tag_msg, formData.msg)) return // 当表单数据验证不通过时 --> 直接返回，执行新下面请求逻辑

    // ↓ 请求逻辑处理
    const result = await queryPost('/product/create/tag', formData)

    if (result.state === 200) {
        showMessage.success('标签新建成功')
        /* 重新发起数据请求，更新标签数据 */
        queryList(payload)
    } else {
        showMessage.error('新建失败')
    }

    /* 处理结束，关闭 popup 弹出层表单 */
    store.upHidePopupForm()
}

export async function editorPopupComfirm() {
    // 🔺修改商品标签
    const formData = store.popupFormData // 获取 popup 表单要提交的数据 formData
    const oldTag = formData?.tag
    if (!formData.tag) {
        showMessage.default('标签名不能为空')
        return
    }

    if (!formData.msg) {
        showMessage.default('标签名描述不能为空')
        return
    }

    if (!RULE_TEST_FUN(rules.tag_name, formData.tag) || !RULE_TEST_FUN(rules.tag_msg, formData.msg)) return // 当表单数据验证不通过时 --> 直接返回，执行新下面请求逻辑

    if (confirm(`请再次确认修改 "${oldTag}" 标签的标签信息!`)) {
        const result = await queryPut('/product/update/tag', formData)

        if (result.state === 200) {
            showMessage.success(`标签信息修改成功`)
            /* 重新发起数据请求，更新标签数据 */
            queryList(payload)
        } else {
            showMessage.error('修改失败')
        }

        /* 处理结束，关闭 popup 弹出层表单 */
        store.upHidePopupForm()
    }
}
