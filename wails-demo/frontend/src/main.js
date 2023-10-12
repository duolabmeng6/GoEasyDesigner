import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)


const modules = import.meta.globEager('./components/组件/*.vue')
for (const path in modules) {
    const name = path.match(/\.\/components\/组件\/(.*)\.vue$/)[1]
    app.component(name, modules[path].default)
}
import 渲染组件 from "./components/渲染组件.vue"
app.component('渲染组件', 渲染组件)

app.use(createPinia())
app.use(ElementPlus)
app.config.warnHandler = function (msg, vm, trace) {
    // 自定义处理警告的逻辑，或者什么都不做以屏蔽
};
app.mount('#app')


