
const useToll = [
    {
        name: "开发工具",
        value: "Visual Studio Code"
    },
    {
        name: "编程语言",
        value: "Visual Studio Code"
    },
    {
        name: "构建工具",
        value: "vite 3.x"
    },
    {
        name: "前端框架",
        value: "Vue 3.x"
    },
    {
        name: "路由工具",
        value: "Vue Router 4.x"
    },
    {
        name: "状态管理",
        value: "Pinia"
    },
    {
        name: "UI 框架",
        value: "Element-plus"
    },
    {
        name: "工具库",
        value: "dayjs"
    },
    {
        name: "CSS 预编译",
        value: "Sass"
    },
    {
        name: "HTTP 工具",
        value: "Axios"
    },
    {
        name: "Git Hook 工具",
        value: "husky"
    },
    {
        name: "代码规范",
        value: "EditorConfig + Prettier + ESLint"
    },
    {
        name: "提交规范",
        value: "Commitizen + Commitlint"
    },
    {
        name: "自动部署",
        value: "CentOS 7.9 + Jenkins + Nginx"
    }
]

const dependencies = {
    "axios": "^1.6.7",
    "dayjs": "^1.11.10",
    "echarts": "^5.5.0",
    "element-plus": "^2.6.1",
    "normalize.css": "^8.0.1",
    "pinia": "^2.1.7",
    "vue": "^3.4.15",
    "vue-router": "^4.3.0"
}

const devDependencies = {
    "@rushstack/eslint-patch": "^1.3.3",
    "@tsconfig/node20": "^20.1.2",
    "@types/node": "^20.11.10",
    "@vitejs/plugin-vue": "^5.0.3",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^12.0.0",
    "@vue/tsconfig": "^0.5.1",
    "commitizen": "^4.3.0",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "husky": "^8.0.3",
    "npm-run-all2": "^6.1.1",
    "prettier": "^3.2.5",
    "typescript": "~5.3.0",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-vue-components": "^0.26.0",
    "vite": "^5.0.11",
    "vue-tsc": "^1.8.27"
}

const dirs = `
├─.husky
│  └─_
├─.vscode
├─public
└─src
    ├─assets
    │  ├─css
    │  └─imgs
    ├─base-ui
    │  ├─h-form
    │  ├─h-table
    │  ├─main--page-search
    │  ├─main-page-content
    │  └─main-page-popup
    ├─components
    │  ├─breadcrumb
    │  ├─main-content
    │  ├─main-header
    │  └─main-nav-menu
    ├─global
    ├─router
    │  ├─login
    │  ├─main
    │  └─nav_protect
    ├─service
    │  ├─login
    │  ├─main
    │  └─request
    ├─store
    │  ├─login
    │  └─main
    ├─utils
    └─views
        ├─login
        │  ├─config
        │  ├─conps
        │  └─hooks
        ├─main
        │  ├─commonComp
        │  │  ├─shop_info
        │  │  │  └─config
        │  │  ├─system_overview
        │  │  └─user_info
        │  │      └─config
        │  ├─config
        │  ├─merchantComp
        │  │  ├─order_main
        │  │  ├─order_return
        │  │  ├─shop_overview
        │  │  └─shop_store_info
        │  └─rootComp
        │      ├─black_list
        │      ├─data_overview
        │      │  └─config
        │      ├─menu
        │      │  └─config
        │      ├─merchant_regis
        │      │  └─config
        │      ├─merchant_user
        │      │  └─config
        │      ├─normal_user
        │      │  └─config
        │      ├─remove_shop
        │      └─tag_comfig
        │          └─config
        └─not_found
`

const standard_git = {
    "add 操作": "git add",
    "commit 操作": "git commit",
    "pull 操作": "git pull",
    "push 操作": "git push"
}

const useConfig = () => {
    return {
        useToll,
        dependencies,
        devDependencies,
        dirs,
        standard_git
    }
}

export default useConfig
