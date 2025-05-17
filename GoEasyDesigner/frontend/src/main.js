import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Menus from 'vue3-menus';
// import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

import Helper from "./Helper.js"

import i18n from './i18n/index.js'

import App from './app11.vue'
// import App from './components/designer/public/支持库.vue'
import {useAppStore} from '@/stores/appStore'
import RenderDesignComponent from "./components/RenderDesignComponent.vue"
import RenderDesignComponentWin from "./components/RenderDesignComponentWin.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {install as VueMonacoEditorPlugin, loader} from '@guolao/vue-monaco-editor'

import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import 编辑器数据 from './编辑器/编辑器提示数据.js'
import ldf from './编辑器/编辑器语法文件.js'
import systemFcDoc from "@/helpDoc/systemFcDoc.json"

const app = createApp(App)
app.use(createPinia())

const store = useAppStore()

store.是否为window系统 = navigator.platform.includes("Win")

app.component('RenderDesignComponent', RenderDesignComponent)
app.component('RenderDesignComponentWin', RenderDesignComponentWin)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 检索自定义组件
let 自定义组件名称列表 = []

async function load自定义组件() {
    try {
        const response = await fetch('/自定义组件/components.json');
        const data = await response.json();
        自定义组件名称列表 = data.components;
        console.log("加载到的组件列表：", 自定义组件名称列表);
        
        // 将组件列表添加到全局配置中
        app.config.globalProperties.自定义组件名称列表 = 自定义组件名称列表;
    } catch (error) {
        console.error("加载组件列表失败：", error);
    }
}

// 在创建应用后立即加载组件
load自定义组件();

function loadEidtCode() {

    app.use(VueMonacoEditorPlugin, {
        paths: {
            // The default CDN config
            // vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.36.0/min/vs'
            vs: ''
        },
    })

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


    const systemFcDocQuickTipQuickTip = {};
    systemFcDoc.forEach(item => {
        let l = JSON.parse(JSON.stringify(item));
        try {
            const extractedContent = item.doc.split(' ')[0];
            l.label = item.help + " " + extractedContent;
        } catch (e) {

        }
        systemFcDocQuickTipQuickTip[item.help] = {
            "insertText": item.help,
            "label": l.label
        }
    });


    store.keywordMappings = 编辑器数据

    monaco.languages.register({id: 'javascript'});
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
                    var {insertText, label} = store.keywordMappings[keyword];
                    suggestions.push(createCustomProposal(range, insertText, label));
                }
            });
            Object.keys(systemFcDocQuickTipQuickTip).forEach(function (keyword) {
                var regex = new RegExp("^" + word.word, "i");
                if (regex.test(keyword)) {
                    var {insertText, label} = systemFcDocQuickTipQuickTip[keyword];
                    suggestions.push(createCustomProposal(range, insertText, label));
                }
            });

            //这里设置排序对输入提示没有影响
            // suggestions.sort((a, b) => {
            //     return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
            // });
            // console.log(JSON.stringify(suggestions, null, 2))
            return {suggestions: suggestions};
        },
    });
    loader.config({monaco})

}

loadEidtCode()


app.config.warnHandler = function (msg, vm, trace) {
    // 自定义处理警告的逻辑，或者什么都不做以屏蔽
};


//注册公用组件
Helper.registerBoxComponentNames(app, '', import.meta.glob('./components/designer/public/*.vue', {eager: true}))

//注册饿了么组件
const BoxComponentNames_el = Helper.registerBoxComponentNames(app, 'el', import.meta.glob('./components/boxs/el/**/*.vue', {eager: true}))
console.log("饿了么组件", BoxComponentNames_el)
let ComponentNameOrder = ['Button', 'TextEdit', 'Label']
ComponentNameOrder = [...new Set([...ComponentNameOrder, ...BoxComponentNames_el])]
ComponentNameOrder = ComponentNameOrder.filter(item => item !== "Container")
app.config.globalProperties.BoxComponentNames_el = ComponentNameOrder
//注册组件默认属性
const BoxComponentDefaultValue = {
    'el': Helper.registerBoxComponentDefaultValue(app, 'el', import.meta.glob('./components/boxs/el/**/*.js', {eager: true})),
    'td': Helper.registerBoxComponentDefaultValue(app, 'td', import.meta.glob('./components/boxs/td/**/*.js', {eager: true})),
    'tw': Helper.registerBoxComponentDefaultValue(app, 'tw', import.meta.glob('./components/boxs/tw/**/*.js', {eager: true}))
}
app.provide('BoxComponentDefaultValue', BoxComponentDefaultValue)

const BoxComponentNames_td = Helper.registerBoxComponentNames(app, 'td', import.meta.glob('./components/boxs/td/**/*.vue', {eager: true}))
const BoxComponentNames_tw = Helper.registerBoxComponentNames(app, 'tw', import.meta.glob('./components/boxs/tw/**/*.vue', {eager: true}))

const BoxComponentNames = {
    'system': ComponentNameOrder,
    'tdesign': BoxComponentNames_td,
    'tailwindcss': BoxComponentNames_tw,
}
app.provide('BoxComponentNames', BoxComponentNames)

// 把i18n挂在到全局

app.config.globalProperties.t = i18n.global.t

//设置全局变量 用于判断是否为设计模式
app.config.globalProperties.designMode = true

app.use(i18n)
// app.use(TDesign)
app.use(ElementPlus)
app.use(Menus);
app.mount('#app')


