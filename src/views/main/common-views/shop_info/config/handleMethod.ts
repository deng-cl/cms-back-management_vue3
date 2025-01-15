import showMessage from '@/utils/showMessage'
import useTableConfig from './useTableConfig'
import { queryDelete, queryPost, queryPut } from '@/service/modules/main'
import useTagStore, { formData } from '../store'
import rules, { RULE_TEST_FUN } from '@/global/form-rules'

const { payload, queryList } = useTableConfig()

const store = useTagStore()

export async function updateShopState(selectedList: any[], state: 'true' | 'false') {
    // 🔺修改商品状态 <上架/下架>

    if (selectedList?.length === 0) {
        showMessage.default('请先选择对应的商品!')
        return
    }

    if (!confirm(`请再次确认批量${state === 'true' ? '上架' : '下架'}商品操作!`)) return // 二次确认: comfirm 确认弹窗

    const payload_list: any[] = []

    selectedList.forEach(async (info) => {
        // 批量下架/下架
        payload_list.push(info.id)
    })

    // -- dispatch 批量上架与下架商品
    const fetchPromiseArray: any[] = []
    payload_list.forEach((shopID) => {
        // 批量下架/下架
        fetchPromiseArray.push(
            queryPut('/product/update/state', {
                id: shopID,
                state
            })
        )
    })

    Promise.all(fetchPromiseArray)
        .then((res) => {
            showMessage.success(`商品批量${state === 'true' ? '上架' : '下架'}成功`)
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            queryList(payload) // 状态修改完成后，更新列表数据
        })
}

export async function createShop() {
    // 🔺 创建商品
    console.log('hong')
    const createShopInfo = store.popupFormData
    console.log(createShopInfo)
    try {
        Object.keys(createShopInfo).forEach((key) => {
            if (!createShopInfo[key] || (createShopInfo[key] === '' && /* 排除 pics 字段 */ key !== 'pics')) {
                // 参数信息不完整
                throw new Error()
            }
        })

        // 校验表单数据的合法性
        console.log(createShopInfo)

        if (
            !RULE_TEST_FUN(rules.product_name, createShopInfo.product_name) ||
            !RULE_TEST_FUN(rules.product_desc, createShopInfo.product_desc) ||
            !RULE_TEST_FUN(rules.product_discount, createShopInfo.product_discount)
        )
            return // 当表单数据验证不通过时 --> 直接返回，执行新下面请求逻辑

        if (confirm('请再次确认创建商品信息!')) {
            // 1. 创建商品基本信息
            const result = await queryPost('/product/create/info', createShopInfo)
            const product_id = result.response.insertId // 商品信息创建 ID --> 即商品 ID，用户 ↓ 上传商品描述图

            // 2. 创建商品详情图
            const _formData = new FormData() // FormData 数据构造器
            createShopInfo.pics.forEach((file: any) => {
                _formData.append('product', file.raw) // 将 file 数据添加至 FormData 中
            })

            await queryPost('/product/create/picture/' + product_id, _formData, {
                // 将 FormData 数据上传至服务器
                'Content-Type': 'multipart/form-data'
            })

            // 3. 创建完成
            showMessage.success('商品创建成功')

            queryList(payload) // 更新数据

            store.upHidePopupForm() // 隐藏弹窗
        }
    } catch (e) {
        console.log(e)
        showMessage.default('参数信息不完整，请补充参数信息!')
    }
}

export async function editorShopInfo() {
    // 修改商品信息
    const updateShopInfo = store.popupFormData
    const detail_pics: (string | undefined)[] = [] // 存储继续需要保留的详情图

    console.log(updateShopInfo)

    if (confirm('请再次确认修改商品信息')) {
        try {
            // 1. 修改商品基本信息
            const result = await queryPut('/product/update/info/' + /* 商品ID */ updateShopInfo.id, updateShopInfo)

            // 2. 修改详情图信息
            store.popupFormData.detail_pics.forEach((item: any) => {
                // 取到每一个详情图的 filename
                if (item && typeof item === 'string') {
                    detail_pics.push(item.split('/').at(-1))
                }
            })

            const _formData = new FormData() // FormData 数据构造器
            updateShopInfo.pics.forEach((file: any) => {
                _formData.append('product', file.raw) // 将商品新详情图中添加至 _formData 中
            })

            _formData.append('params', JSON.stringify(detail_pics)) // 将需要继续保留的商品详情图通过 params 传递给服务器，后端根据里面的 filename 进行保留对应的商品描述图

            await queryPut('/product/update/picture/' + updateShopInfo.id, _formData, {
                // 将 FormData 数据上传至服务器
                'Content-Type': 'multipart/form-data'
            })

            queryList(payload) // 更新数据

            showMessage.success('已更新商品信息')

            store.upHidePopupForm() // 隐藏弹出表单
        } catch (e) {
            console.log('Error:', e)
        }
    }
}

export async function deleteShopInfo(rowData: any) {
    // 删除商品
    const { /* 获取对应商品 ID */ id, product_name } = rowData

    if (confirm(`请再次确认删除商品 "${product_name}" !`)) {
        const result = await queryDelete(`/product/delete/${id}`, {}) // 删除商品

        showMessage.success(result.msg)

        queryList(payload) // 更新数据
    }
}

export function showProductDetail(rowData: any) {
    // 查询某一商品详情
    console.log(JSON.stringify(rowData))
}
