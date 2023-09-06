import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {WindowSetSize, WindowSetTitle} from "../../wailsjs/runtime"; // 根据实际文件路径进行修改
import {绑定窗口事件} from '@/窗口/窗口事件'
import __辅助代码 from "@/窗口/辅助代码";

export const 引入窗口数据 = defineStore('窗口数据', {
    state: () => {
        let data = {}
        data.list = ref([])
        data.组件 = {}
        return data
    },
    actions: {
        初始化() {
            绑定窗口事件(this, this.组件)
            try {
                if (this.组件.窗口.hasOwnProperty("事件创建完毕")) {
                    this.窗口创建完毕()
                }
            }catch (e){
                console.log("窗口创建完毕事件未定义")
            }


            try {
                // console.log(window.navigator)
                if (window.navigator && window.navigator.appVersion && window.navigator.appVersion.indexOf("Mac") !== -1) {
                    console.log("macOS system.");
                    WindowSetSize(parseInt(this.组件.窗口.width), parseInt(this.组件.窗口.height) + 28)
                } else {
                    console.log("window");
                    WindowSetSize(parseInt(this.组件.窗口.width) + 13, parseInt(this.组件.窗口.height) + 35)
                }
                WindowSetTitle(this.组件.窗口.标题)
            } catch (e) {

            }
        },
        handleAllEvents(el, e, item) {
            let 事件列表;
            事件列表 = {
                "click": "被单击",
                "mousedown": "鼠标左键被按下",
                "mouseup": "鼠标左键被放开",
                "dblclick": "被双击",
                "contextmenu": "鼠标右键被按下",
                "mousemove": "鼠标位置被移动",
                "focus": "获得焦点",
                "blur": "失去焦点",
                "keydown": "按下某键",
                "keyup": "放开某键",
                "mousewheel": "滚轮被滚动"
            }
            let 最终事件名称 = item.名称 + 事件列表[event.type]
            let 动态函数 = undefined
            eval(`动态函数 = this.${最终事件名称}`)
            if (动态函数 != undefined) {
                // console.log("动态函数",动态函数)
                // console.log('触发了事件:', 最终事件名称, item,);
                动态函数(e, item)
            } else {
                console.log("函数未定义", 最终事件名称)
            }
        },

        组件点击(e, item) {
            console.log("item", item)
            if (item.事件被单击 == "" || item.事件被单击 == undefined) {
                return
            }
            let 动态脚本 = "this." + item.事件被单击 + "()"
            try {
                eval(动态脚本)
            } catch (e) {
                console.log("调用未定义函数", item.事件被单击)
            }
        }
    },
})