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

app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')


