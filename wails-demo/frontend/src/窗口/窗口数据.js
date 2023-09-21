import {ref} from 'vue'
import {defineStore} from 'pinia'
import {WindowSetSize, WindowSetTitle} from "../../wailsjs/runtime"; // 根据实际文件路径进行修改
import {绑定窗口事件} from '@/窗口/窗口事件'

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
            } catch (e) {
                console.log("窗口创建完毕事件未定义")
            }

            const dthis = this

            try {
                //使用一种自适应方法兼容window和macos的窗口大小
                WindowSetSize(parseInt(dthis.组件.窗口.width), parseInt(dthis.组件.窗口.height))
                //重新计算客户区宽度高度
                setTimeout(function () {
                    var WidthFix = parseInt(dthis.组件.窗口.width) - window.innerWidth
                    var HeightFix = parseInt(dthis.组件.窗口.height) - window.innerHeight
                    // console.log("WidthFix", WidthFix)
                    // console.log("HeightFix", HeightFix)
                    // console.log("window.innerHeight", window.innerHeight)
                    // console.log("window.innerWidth", window.innerWidth)
                    WindowSetSize(parseInt(dthis.组件.窗口.width) + WidthFix, parseInt(dthis.组件.窗口.height) + HeightFix)
                    document.body.style.overflow = 'auto'
                }, 1)
                WindowSetTitle(dthis.组件.窗口.标题)

                return
                // console.log(window.navigator)
                // if (window.navigator && window.navigator.appVersion && window.navigator.appVersion.indexOf("Mac") !== -1) {
                //     console.log("macOS system.");
                //     WindowSetSize(parseInt(this.组件.窗口.width), parseInt(this.组件.窗口.height) + 28)
                // } else {
                //     console.log("window");
                //     //win10
                //     //win11
                //     navigator.userAgentData.getHighEntropyValues(["platformVersion"])
                //         .then(ua => {
                //             if (navigator.userAgentData.platform === "Windows") {
                //                 const majorPlatformVersion = parseInt(ua.platformVersion.split('.')[0]);
                //                 if (majorPlatformVersion >= 13) {
                //                     console.log("Windows 11");
                //                     WindowSetSize(parseInt(this.组件.窗口.width) + 16, parseInt(this.组件.窗口.height) + 39)
                //                 } else if (majorPlatformVersion > 0) {
                //                     console.log("Windows 10");
                //                     WindowSetSize(parseInt(this.组件.窗口.width) + 13, parseInt(this.组件.窗口.height) + 35)
                //                 } else {
                //                     console.log("Windows 10");
                //                     WindowSetSize(parseInt(this.组件.窗口.width) + 13, parseInt(this.组件.窗口.height) + 35)
                //                 }
                //             } else {
                //                 console.log("Not running on Windows");
                //                 WindowSetSize(parseInt(this.组件.窗口.width) + 13, parseInt(this.组件.窗口.height) + 35)
                //             }
                //         });
                // }
                // WindowSetTitle(this.组件.窗口.标题)
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