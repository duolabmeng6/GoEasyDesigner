import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ref } from 'vue'

// import App from './components/设计器组件/代码编辑器.vue'
// import App from './测试代码编辑器.vue'
import App from './app9.vue'
// import App from './components/设计器组件/项目管理.vue'

const app = createApp(App)
app.use(createPinia())
import {useCounterStore} from '@/stores/counter'
const store = useCounterStore()

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
// let 组件名称顺序 = ['按钮', '编辑框', '标签', '开关','布局容器']
let 组件名称顺序 = ['按钮', '编辑框', '标签', '开关']

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
        // vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.36.0/min/vs'
        vs: ''
    },
})
import { loader } from "@guolao/vue-monaco-editor"

import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "json") {
            return new jsonWorker()
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker()
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker()
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker()
        }
        return new editorWorker()
    }
}

function createCustomProposal(range, insertText, label) {
    return {
        label: label,
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "",
        insertText: insertText,
        range: range,
    };
}
import 编辑器数据 from './编辑器/编辑器提示数据.js'
// let keywordMappings = ref({})
// keywordMappings.value = 编辑器数据
store.keywordMappings = 编辑器数据
// 将 keywordMappings 共享到全局课修改
// app.provide('keywordMappings',keywordMappings);
// 注册你的自定义语言
monaco.languages.register({ id: 'javascript' });

import ldf from './编辑器/编辑器语法文件.js'

monaco.languages.setMonarchTokensProvider('javascript', ldf);

monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: function (model, position) {
        var word = model.getWordUntilPosition(position);
        var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };
        // 检查用户输入的关键词是否在映射中
        var suggestions = [];
        Object.keys(store.keywordMappings).forEach(function (keyword) {
            var regex = new RegExp("^" + word.word, "i");
            if (regex.test(keyword)) {
                var { insertText, label } = store.keywordMappings[keyword];
                suggestions.push(createCustomProposal(range, insertText, label));
            }
        });
        //这里设置排序对输入提示没有影响
        // suggestions.sort((a, b) => {
        //     return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
        // });
        // console.log(JSON.stringify(suggestions, null, 2))

        return { suggestions: suggestions };
    },
});

loader.config({ monaco })
app.config.warnHandler = function (msg, vm, trace) {
    // 自定义处理警告的逻辑，或者什么都不做以屏蔽
};
app.use(ElementPlus)
app.mount('#app')


