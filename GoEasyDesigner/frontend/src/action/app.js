import {useAppStore} from '@/stores/appStore.js'
import * as goFc from "../../wailsjs/go/main/App";
import {
    E保存,
    E保存件对话框,
    E停止命令,
    E取文件修改时间,
    E打开文件对话框,
    E检查更新,
    E读入文件,
    E运行命令
} from "../../wailsjs/go/main/App";
import {取父目录, 生成辅助代码} from "@/public";
import {ElMessage} from "element-plus";
import {BrowserOpenURL, EventsOn} from "../../wailsjs/runtime";
// 使用 $refs 来引用滚动容器
import {useI18n} from "vue-i18n";

export const appAction = {};
let store = {}; // 我想在这里作类型标注 useAppStore()怎么处理怎么写
let t = {}

const 代码编辑器类 = {};
try {
    EventsOn("文件被修改", function (data) {
        console.log("文件被修改", data)
        setTimeout(function () {
            appAction.检查代码编辑器的内容是否为最新的()

        }, 500)
    })
} catch (e) {

}
代码编辑器类.打开 = async function (文件路径) {
    store.代码编辑器.路径 = 文件路径
    store.代码编辑器.内容 = await E读入文件(文件路径)
    store.代码编辑器.文件时间 = await E取文件修改时间(文件路径)
    console.log("代码编辑器.文件时间", store.代码编辑器.文件时间)
    console.log("代码编辑器.路径", store.代码编辑器.路径)
    goFc.E添加文件监视(文件路径)

    return store.代码编辑器.内容
}

appAction.代码编辑器操作 = 代码编辑器类

appAction.init = function () {
    appAction.store = useAppStore()
    store = useAppStore()
    t = useI18n().t
}
appAction.新建项目 = function () {
    store.显示新建项目对话框 = true

}
appAction.打开项目 = async function () {
    const result = await goFc.E打开选择文件夹对话框();
    if (result === "") {
        //弹出饿了么信息框 提示创建失败
        ElMessage({
            message: '未选择项目目录',
            type: 'error',
        });
        return false
    }

    let files = await goFc.E搜索文件(result,"design.json")
    if (files.length === 0){
        //弹出饿了么信息框 提示创建失败
        ElMessage({
            message: '项目目录下没有找到design.json文件',
            type: 'error',
        });
        return false
    }
    console.log("搜索文件",files)
    appAction._打开文件加载界面(files[0])
    return true

}

appAction.新建 = function () {
    function 创建窗口() {
        return {
            "id": "1",
            "name": t('componentName.Window'),
            "componentName": 'Window',
            "text": t('componentName.Window'),
            "top": "0",
            "left": "0",
            "width": "500",
            "height": "400",
            "background": "rgba(0, 0, 0, 0.05)",
            "noPlace": false,
            "noDrag": true,
            "disable": false,
            "visible": true,
            "zIndex": 0,
            "childComponents": []
        }
    }

    appAction.store.list = [创建窗口()]
    appAction.store.indexMap = {}
    appAction.store.代码编辑器.内容 = ""
}
appAction.打开 = async function () {
    if (appAction.store.客户端模式 == false) {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = e => {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
                const data = reader.result
                console.log(data)
                // 初始化界面(data)
                store.list = JSON.parse(data)
                store.取组件列表()

            }
        }
        input.click()

        return
    }

    console.log("打开")
    let 文件路径 = await E打开文件对话框();
    if (文件路径 === "") {
        return
    }
    appAction._打开文件加载界面(文件路径)

}
appAction._打开项目设计文件 = function (filepath) {
    store.项目信息.设计文件路径 = filepath
    store.项目信息.窗口事件文件路径 = 取父目录(filepath) + "/event.js"
    store.项目信息.辅助代码文件路径 = 取父目录(filepath) + "/__aux_code.js"
    store.项目信息.项目管理目录 = 取父目录(filepath)
    store.项目信息.项目根目录 = 取父目录(取父目录(取父目录(取父目录(filepath))))
}

appAction._打开文件加载界面 = async function (filepath) {
    appAction._打开项目设计文件(filepath)

    console.log("设计文件路径", store.项目信息.设计文件路径)
    console.log("窗口事件文件路径", store.项目信息.窗口事件文件路径)
    let 文件内容 = await E读入文件(store.项目信息.设计文件路径)
    // console.log(文件内容)

    store.list = JSON.parse(文件内容)

    // await nextTick();
    store.取组件列表()
    store.当前拖拽组件数据 = store.组件通过id查找结构("1")

    await appAction.代码编辑器操作.打开(store.项目信息.窗口事件文件路径)
    store.项目管理刷新()

}

try {
    EventsOn("运行命令", function (data) {
        console.log("运行命令", data)
        store.调试信息 = store.调试信息 + "<br / >" + data
        store.scrollContainer.scrollTop = store.scrollContainer.scrollHeight;
        if (data == "命令已完成") {
            store.运行按钮文本 = t("app.run");
            store.编译按钮文本 = t("app.compile");

        }
    })
} catch (e) {
    console.log('非客户端模式')
}

function 键盘按下(event, index) {
    console.log("键盘按下", event.key, index)
    if (event.key == 'Delete') {

    }
}


appAction.保存设计文件 = async function () {
    let njson = JSON.stringify(store.list, null, 2)
    console.log("保存设计文件", store)
    let 辅助代码 = 生成辅助代码(store.list[0].childComponents)
    console.log("辅助代码", 辅助代码)


    if (store.客户端模式 == false) {
        //浏览器打开就发起保存
        const blob = new Blob([njson], {type: 'application/json'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'design.json'
        link.click()

        const blob2 = new Blob([辅助代码], {type: 'application/json'})
        const link2 = document.createElement('a')
        link2.href = URL.createObjectURL(blob2)
        link2.download = '__aux_code.js'
        link2.click()
        return;
    }

    // 客户端直接保存
    async function _保存(p, d) {
        d = String(d)
        p = String(p)
        await E保存(p, d)
    }

    if (store.项目信息.设计文件路径 == "") {
        let 设计文件路径 = await E保存件对话框()
        if (设计文件路径 === "") {
            ElMessage({message: "未选择文件", type: 'success', duration: 3000});
            return
        }
        appAction._打开项目设计文件(设计文件路径)
    }

    if (store.代码编辑器.内容 !== "") {
        if (store.代码编辑器.路径 === store.项目信息.窗口事件文件路径) {
            await _保存(store.项目信息.窗口事件文件路径, store.代码编辑器.内容)
            store.代码编辑器.文件时间 = await E取文件修改时间(store.项目信息.窗口事件文件路径)
            console.log("保存后 代码编辑器.文件时间", store.代码编辑器.文件时间)
        }
        await _保存(store.项目信息.辅助代码文件路径, 辅助代码)
    }
    await _保存(store.项目信息.设计文件路径, njson)

}
appAction.检查代码编辑器的内容是否为最新的 = async function () {
    if (store.代码编辑器.内容 !== "") {
        let 文件时间 = await E取文件修改时间(store.项目信息.窗口事件文件路径)
        console.log("文件时间", 文件时间)
        console.log("store.代码编辑器.文件时间", store.代码编辑器.文件时间)
        if (文件时间 > store.代码编辑器.文件时间) {
            console.log("发现变化代码已更新")
            appAction.代码编辑器操作.打开(store.项目信息.窗口事件文件路径)
        } else {
            console.log("不需要更新")
        }
    }
}
appAction.设计区域被改变 = function () {
    // console.log("设计区域被改变",store.选择夹_中间现行选中项 )
    // if(store.选择夹_中间现行选中项 == "1"){
    //     appAction.检查代码编辑器的内容是否为最新的()
    //
    // }

}


appAction.运行 = function () {
    if (store.客户端模式 == false) {
        //弹出提示
        ElMessage({
            message: "当前为浏览器模式 不能运行 请自行在项目根目录运行 wails dev",
            type: 'success',
            duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
        return
    }
    if (store.项目信息.项目根目录 == "") {
        ElMessage({
            message: "请先保存",
            type: 'success',
            duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
        return
    }


    if (store.运行按钮文本 == t("app.run")) {
        store.运行按钮文本 = t("app.stop")
        store.调试信息 = t("app.inOperation")
        store.选择夹_底部现行选中项 = "1"
        E运行命令(store.项目信息.项目根目录, "wails dev -nocolour")
    } else {
        store.调试信息 = t('app.stopped')
        store.运行按钮文本 = t("app.run")
        E停止命令()
    }

}
appAction.编译 = function () {
    if (store.客户端模式 == false) {
        //弹出提示
        ElMessage({
            message: "当前为浏览器模式 不能编译 请自行在项目根目录运行 wails build",
            type: 'success',
            duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
        return
    }
    if (store.项目信息.项目根目录 == "") {
        ElMessage({
            message: "请先保存",
            type: 'success',
            duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
        return
    }
    if (store.编译按钮文本 == t("app.compile")) {
        store.编译按钮文本 = t("app.stop")
        store.调试信息 = t("app.inCompile")
        store.选择夹_底部现行选中项 = "1"
        E运行命令(store.项目信息.项目根目录, "wails build")
    } else {
        store.调试信息 = "已停止 ..."
        store.编译按钮文本 = t("app.compile")
        E停止命令()
    }

}

appAction.帮助 = function () {
    if (store.客户端模式) {
        BrowserOpenURL("https://github.com/duolabmeng6/GoEasyDesigner")
    } else {
        //浏览器打开新页面
        window.open("https://github.com/duolabmeng6/GoEasyDesigner")
    }
}

appAction.下载客户端 = function () {
    if (store.是否为window系统) {
        window.open(store.window下载地址)
    } else {
        window.open(store.mac下载地址)
    }

}


appAction.运行环境检测 = function () {
    if (store.客户端模式 == false) {
        //弹出提示
        ElMessage({
            message: "当前为浏览器模式 不能运行 请自行在项目根目录运行 wails doctor",
            type: 'success',
            duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
        return
    }
    store.选择夹_底部现行选中项 = "1"
    store.调试信息 = "运行环境检测 ..."
    let 结果;
    结果 = E运行命令(store.项目信息.项目根目录, "wails doctor")
    console.log("结果")
    // 检查node是否安装

}

appAction.检查更新 = function () {
    E检查更新()
}

export default {
    appAction,
}