import hRequest from "..";
import showMessage from "@/utils/showMessage";
import type { IOptions } from "@/base-ui/h-form/types";


/* ----------------------------- ↓ 重构 ----------------------------- */
export const queryGet = async (url: string, payload: any, showLoading = true) => {
    const result: any = await hRequest.get({
        url,
        data: payload, // get 请求时，body 参数会直接被忽略 --> 即不会传到后端，因为遵循WHATWG的标准 <因为postman并没有遵循WHATWG的标准，body参数没有被忽略>
        params: payload,
        showLoading: showLoading
    })

    if (result.state !== 200) { // 请求失败
        showMessage.error(result?.msg)
        return false
    }

    return result
}

export const queryPost = async (url: string, payload: any, headers?: any) => {
    const result: any = await hRequest.post({
        url,
        data: payload,
        headers
    })

    if (result.state !== 200) { // 请求失败
        showMessage.error(result?.msg)
        return false
    }

    return result
}

export const queryDelete = async (url: string, payload: any) => {
    const result: any = await hRequest.delete({
        url,
        data: payload
    })

    if (result.state !== 200) { // 请求失败
        showMessage.error(result?.msg)
        return false
    }

    return result
}

export const queryPut = async (url: string, payload: any, headers?: any) => {
    const result: any = await hRequest.put({
        url,
        data: payload,
        headers
    })

    if (result.state !== 200) { // 请求失败
        showMessage.error(result?.msg)
        return false
    }

    return result
}


// 🔺主意: 仅用于 select 表单中的配置 --> 获取所有 product_tag 商品标签
export const queryTagList: () => Promise<IOptions[]> = async () => {
    const result = await queryGet("/product/query/tag_list_all", {})
    const tagList: IOptions[] = []

    result.data.forEach((tagInfo: any) => {
        tagList.push({
            value: tagInfo.tag_name,
            label: tagInfo.tag_name,
        })
    })

    return tagList
}


