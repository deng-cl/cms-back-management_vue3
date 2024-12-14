import { createPinia } from "pinia"; // 1. 导入 pinia 中的 createPinia <函数：用于创建 pinia>


const pinia = createPinia() // 2. 创建 pinia 实例


export default pinia // 3. 导出 pinia 实例 --> 在项目的入口文件中通过 app.use(pinia实例) 来全局注册 pinia
