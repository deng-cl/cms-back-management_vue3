import type { FormatDateByTyps } from "custom"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

export const formatUTCString = (date: string, type: FormatDateByTyps) => { // 该方法仅用于该项目中服务器返回的时间格式进行格式化，如 '2024-03-16T03:25:12.000Z'
    return dayjs.utc(date).format(type)
}


