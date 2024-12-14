import { unref } from "vue"

class LocalCache { /* 本地缓存封装 --> localStorage */
    setCache(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(unref(value)))
    }

    getCache(key: string) {
        const value = unref(window.localStorage.getItem(key))
        if (value && typeof value !== 'boolean' && value !== 'undefined') {
            return JSON.parse(value)
        } else if (value == 'undefined') {
            return ''
        } else {
            return value
        }
    }

    deleteCache(key: string) {
        window.localStorage.removeItem(key)
    }

    clearCache() {
        window.localStorage.clear()
    }
}

const localCache = new LocalCache()

export default localCache

