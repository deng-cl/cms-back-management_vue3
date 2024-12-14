/* 封装消息提示框 */
import { ElMessage } from "element-plus";

class ShowMessage {
    success(msg: string) {
        ElMessage({
            message: msg,
            type: 'success',
            duration: 1000
        })
    }

    error(msg: string) {
        ElMessage({
            message: msg,
            type: 'error',
            duration: 1000
        })
    }

    default(msg: string) {
        ElMessage(msg)
    }
}

const showMessage = new ShowMessage()

export default showMessage
