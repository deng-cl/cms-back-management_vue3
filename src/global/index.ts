import { formatUTCString } from "@/utils/format";
import type { App } from "vue";

export const addGlobalProperties = (app: App<Element>) => {
    app.config.globalProperties.$filters = {
        formatUTCString
    }
}
