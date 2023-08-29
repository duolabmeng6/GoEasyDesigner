import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App2.vue'

const app = createApp(App)

// import 按钮 from '@/components/按钮.vue';
// app.component('按钮', 按钮)
// import 编辑框 from '@/components/编辑框.vue';
// app.component('编辑框', 编辑框)
// import 标签 from '@/components/标签.vue';
// app.component('标签', 标签)
// import 开关 from '@/components/开关.vue';
// app.component('开关', 开关)
// 读取 components 的所有文件名，然后自动导入

let 组件名称列表 = []
const modules = import.meta.globEager('./components/组件/*.vue')
for (const path in modules) {
    const name = path.match(/\.\/components\/组件\/(.*)\.vue$/)[1]
    app.component(name, modules[path].default)
    组件名称列表.push(name)
}
console.log(组件名称列表)
//写出共享的变量
let 组件名称顺序 = ['按钮', '编辑框', '标签', '开关']
// 与组件名称列表合并但是根据组件名称顺序排序
组件名称列表 = [...new Set([...组件名称顺序, ...组件名称列表])]

app.config.globalProperties.组件名称列表 = 组件名称列表


const modules2 = import.meta.globEager('./components/属性/*.vue')
for (const path in modules2) {
    const name = path.match(/\.\/components\/属性\/(.*)\.vue$/)[1]
    app.component(name, modules2[path].default)
}

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')


