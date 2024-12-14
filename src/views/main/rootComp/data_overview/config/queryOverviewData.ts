import { queryGet } from '@/service/main/main'
import useOverViewStore from '../store'

export const queryOverviewData = async () => {
    const store = useOverViewStore()

    store.tag_list = (await queryGet('/product/query/tag_list_all', {}, false)).data // 获取标签数据信息

    store.user_type_info = (await queryGet('/user/type/info', {}, false)).data // 获取用户类型列表

    store.user_count_info = (await queryGet('/user/count/info', {}, false)).data[0] // 获取用户数量信息（ALL TOTAL & ROOT TOTAL & MERCHANT TOTAL & NORMAL TOTAL & ENDABL TOTAL & DISABLE TOTAL）

    store.shop_total = (await queryGet('/product/count/info', {})).data // 获取所有商品总数

    for (let i = 0; i < store.tag_list.length; i++) {
        const result = await queryGet('/product/count/by_tag_type', { tag_name: store.tag_list[i].tag_name }, false) // 根据商品标签获取对应的商品数量
        store.shop_count_info.name.add(store.tag_list[i].tag_name)
        store.shop_count_info.data.push(result.data[0].total)
    }
}

export const queryOverviewData_old = async () => {
    const store = useOverViewStore()

    if (!store.tag_list) {
        store.tag_list = (await queryGet('/product/query/tag_list_all', {})).data // 获取标签数据信息
    }


    if (!store.user_type_info) {
        store.user_type_info = (await queryGet('/user/type/info', {})).data // 获取用户类型列表
    }


    if (!store.user_count_info) {
        store.user_count_info = (await queryGet('/user/count/info', {})).data[0] // 获取用户数量信息（ALL TOTAL & ROOT TOTAL & MERCHANT TOTAL & NORMAL TOTAL & ENDABL TOTAL & DISABLE TOTAL）
    }

    if (!store.shop_total) {
        store.shop_total = (await queryGet('/product/count/info', {})).data // 获取所有商品总数
    }


    if (store.shop_count_info.name.size === 0 || store.shop_count_info.data.length === 0) {
        for (let i = 0; i < store.tag_list.length; i++) {
            const result = await queryGet('/product/count/by_tag_type', { tag_name: store.tag_list[i].tag_name }) // 根据商品标签获取对应的商品数量
            store.shop_count_info.name.add(store.tag_list[i].tag_name)
            store.shop_count_info.data.push(result.data[0].total)
        }
    }

    // ↑ 为避免重复请求，使用 if 判断是否已经存在数据
}
