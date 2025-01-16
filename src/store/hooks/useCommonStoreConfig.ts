// 🔺 公共用户 store 配置 <商家用户 | 普通用户> --> 公共 store ，相同逻辑的抽取 --> hook
import type { PaginationConfig } from '@/base-ui/h-table/types'
import { queryGet, queryPost } from '@/service/modules/main'
import { ref, computed, type Ref } from 'vue'

export interface StoreReturnType {
    // 定义 store 返回的状态属性类型
    userInfo: Ref<any>
    activeUserInfo: Ref<any>
    queryList: (payload: any) => any
    paginationConfig: Ref<PaginationConfig>
    reStateByQueryList: () => void
    showPopupForm: Ref<boolean>
    upShowPopupForm: () => void
    upHidePopupForm: () => void
    showPopupType: Ref<'editor' | 'create'>
    popupFormData: Ref<any>
}

type store = () => StoreReturnType // store 函数
type CommonStoreConfigType = (url: string, formData: any, isGet?: boolean) => store // 接收一个 url 请求地址，与 formData 模糊请求参数 --> 返回一个 stroe 配置项

export const useCommonStoreConfig: CommonStoreConfigType = (url: string, formData: any, isGet: boolean = false) => {
    return () => {
        const userInfo: Ref<any[]> = ref([]) // 用户列表信息

        const total = ref() // 用户列表数据总数 --> 计算属性，根据 userInfo 中服务器响应的 total 属性

        const activeUserInfo = computed(() => {
            // 当前所在页面展示的用户列表信息 --> 当前展示 userInfo 列表 <计算属性: 当前 currentPage 当前页标识发生改变时，自动计算当前页所要展示的数据>
            return userInfo.value[currentPage.value] // 根据 currentPage 当前页在 userInfo 中获取对应的数据，获得当前页的展示数据
        })

        const size = ref(15) // 一页展示多少数据量

        const currentPage = ref(1) // 当前页标识 <当前页码>

        const sizeChange = (sizeCount: any) => {
            // 监听更改页面展示的数据量的修改事件 --> 用于需改单页数据展示量...
            size.value = sizeCount
            reStateByQueryList() // 状态重置
            queryList(formData) // 当 size 数据展示量发生改变时，重新发起数据的请求
        }

        const currentChange = (pageCount: any) => {
            // 监听当前页的标识事件 --> 即当前页发生改变时 --> 如 1 - 2 ... --> 用于修改当前页时，重新请求更新数据或切换数据...

            currentPage.value = pageCount // 更新当前页码

            if (!userInfo.value[pageCount] /* 不存在数据 */) {
                // 判断 userInfo 中是否已经存在该 pageCount 页的数据，不存在则请求，反之使用缓存中的数据
                queryList(formData) // formData 模糊查询的参数<在 ./config 中进行导入> --> 重新请求数据
            }
        }

        const queryList = async (payload: any) => {
            // 数据请求方法
            let result = null
            if (isGet) {
                result = await queryGet(/* 🔺，根据使用该 hook 时传入的 url，来动态决定请求数据的地址 */ url, {
                    ...payload, // --> 模糊查询参数
                    limit: size.value, // 查询的数据量 --> 分页查询
                    offset: (currentPage.value - 1) * size.value // 查询数据的偏移量 --> 分页查询
                })
            } else {
                result = await queryPost(/* 🔺，根据使用该 hook 时传入的 url，来动态决定请求数据的地址 */ url, {
                    ...payload, // --> 模糊查询参数
                    limit: size.value, // 查询的数据量 --> 分页查询
                    offset: (currentPage.value - 1) * size.value // 查询数据的偏移量 --> 分页查询
                })
            }

            total.value = result.data?.total // 将用户数据总量，赋值给 total 状态进行存储 --> 存储数据总数

            // if (result) pages.value.push(currentPage.value) // 请求成功 --> 缓存当前请求页码

            userInfo.value[currentPage.value] = result.data?.data // 将 currentPage 分页对应的数据，存储在对应 userInfo 的对应位置中

            return result
        }

        const reStateByQueryList = () => {
            // store 状态重置: 点击搜索按钮... --> 重置 pages、userInfo、currentPage
            userInfo.value = [] // 重置 userInfo 数据信息
            currentPage.value = 1 // 重置 currentPage 当前页码
        }

        const paginationConfig: Ref<PaginationConfig> = ref({
            // 分页器配置项
            prop: {
                total: total,
                size: size.value,
                currentPage: currentPage
            },
            event: {
                currentChange: currentChange,
                sizeChange: sizeChange
            }
        })

        const popupFormData: Ref<any> = ref()
        const showPopupForm: Ref<boolean> = ref(false) // 是否显示弹出层表单 --> 用于创建修改新用户等
        const upShowPopupForm = () => {
            showPopupForm.value = true
        }
        const upHidePopupForm = () => {
            showPopupForm.value = false
        }
        const showPopupType: Ref<'editor' | 'create'> = ref('create')

        return {
            userInfo,
            activeUserInfo,
            queryList,
            paginationConfig,
            reStateByQueryList,
            showPopupForm,
            upShowPopupForm,
            upHidePopupForm,
            showPopupType,
            popupFormData
        }
    }
}
