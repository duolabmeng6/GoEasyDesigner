import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import 组件数据 from '@/窗口/组件数据.json';
import {WindowSetSize, WindowSetTitle} from "../../wailsjs/runtime"; // 根据实际文件路径进行修改
import {绑定窗口事件} from '@/窗口/窗口事件'
import __代码辅助 from "@/窗口/辅助代码";
export const 引入窗口数据 = defineStore('窗口数据', {
    state: () => {
        let data = {}
        data.list = ref([])
        data.组件 = {}
        return data
    },
    actions: {
        初始化() {
            this.list = 组件数据
            this.组件 = __代码辅助(组件数据, this.组件)
            绑定窗口事件(this, this.组件)


            // try {
            //     this.窗口创建完毕()
            // }   catch (e) {
            //     console.log("窗口创建完毕事件未定义")
            // }
            //
            // try {
            //     console.log(window.navigator)
            //     if (window.navigator && window.navigator.appVersion && window.navigator.appVersion.indexOf("Mac") !== -1) {
            //         console.log("macOS system.");
            //         WindowSetSize(parseInt(this.组件.窗口.宽度), parseInt(this.组件.窗口.高度)+28)
            //
            //     } else {
            //         console.log("window");
            //         WindowSetSize(parseInt(this.组件.窗口.宽度) + 13, parseInt(this.组件.窗口.高度) + 35)
            //
            //     }
            //     WindowSetTitle(this.组件.窗口.标题)
            // } catch (e) {
            //
            // }
        },

        组件点击(e, item) {
            console.log("item",item)
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