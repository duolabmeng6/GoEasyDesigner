import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import App from './components/设计器组件/代码编辑器.vue'
import App from './app9.vue'
// import App from './components/设计器组件/项目管理.vue'

const app = createApp(App)

// import 按钮.json from '@/components/按钮.json.vue';
// app.component('按钮.json', 按钮.json)
// import 编辑框 from '@/components/编辑框.vue';
// app.component('编辑框', 编辑框)
// import 标签 from '@/components/标签.vue';
// app.component('标签', 标签)
// import 开关 from '@/components/开关.vue';
// app.component('开关', 开关)
// 读取 components 的所有文件名，然后自动导入

import 渲染组件 from "./components/渲染设计组件.vue"
app.component('渲染组件', 渲染组件)


let 组件名称列表 = []
const modules = import.meta.globEager('./components/组件/*.vue')
for (const path in modules) {
    const name = path.match(/\.\/components\/组件\/(.*)\.vue$/)[1]
    app.component(name, modules[path].default)
    组件名称列表.push(name)
}
console.log(组件名称列表)
//写出共享的变量
let 组件名称顺序 = ['按钮', '编辑框', '标签', '开关','布局容器']
// 与组件名称列表合并但是根据组件名称顺序排序
组件名称列表 = [...new Set([...组件名称顺序, ...组件名称列表])]

app.config.globalProperties.组件名称列表 = 组件名称列表


// let 创建组件属性默认值 = {}
// import 创建组件属性_按钮 from './components/创建组件属性/按钮.js';
// import 创建组件属性_布局容器 from './components/创建组件属性/布局容器.js';
// import 创建组件属性_选择夹 from './components/创建组件属性/选择夹.js';
// 创建组件属性默认值["按钮"] = 创建组件属性_按钮
// 创建组件属性默认值["布局容器"] = 创建组件属性_布局容器
// 创建组件属性默认值["选择夹"] = 创建组件属性_选择夹
let 创建组件属性默认值 = {}
const modulesjs = import.meta.globEager('./components/创建组件属性/*.js')
for (const path in modulesjs) {
    const name = path.match(/\.\/components\/创建组件属性\/(.*)\.js$/)[1]
    创建组件属性默认值[name] = modulesjs[path].default
}
app.provide('创建组件属性默认值', 创建组件属性默认值)

const modules2 = import.meta.globEager('./components/属性/*.vue')
for (const path in modules2) {
    const name = path.match(/\.\/components\/属性\/(.*)\.vue$/)[1]
    app.component(name, modules2[path].default)
}

const modules3 = import.meta.globEager('./components/设计器组件/*.vue')
for (const path in modules3) {
    const name = path.match(/\.\/components\/设计器组件\/(.*)\.vue$/)[1]
    app.component(name, modules3[path].default)
}


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'
app.use(VueMonacoEditorPlugin, {
    paths: {
        // The default CDN config
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.36.0/min/vs'
    },
})

app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')


