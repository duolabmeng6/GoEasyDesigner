import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import 组件数据 from '../组件数据.json';
import {WindowSetSize} from "../../wailsjs/runtime"; // 根据实际文件路径进行修改
import {绑定窗口事件} from '@/窗口事件'

export const 引入窗口数据 = defineStore('窗口数据', {
    state: () => {
        let data = {}
        data.组件列表 = ref([])
        data.组件 = 组件数据
        return data
    },
    actions: {
        初始化() {
            let 组件列表 = []
            for (var key in 组件数据) {
                if (key == "窗口") {
                    continue
                }
                组件列表.push(组件数据[key])
            }
            this.组件列表 = 组件列表
            绑定窗口事件(this)
            try {
                this.窗口创建完毕()
            }   catch (e) {
                console.log("窗口创建完毕事件未定义")
            }

            try {
                WindowSetSize(this.组件.窗口.宽度 + 13, this.组件.窗口.高度 + 35)
            } catch (e) {

            }
        },
        取窗口样式() {
            const result = {}
            result['width'] = this.组件.窗口.宽度 + "px"
            result['height'] = this.组件.窗口.高度 + "px"
            return result
        },
        取组件样式(style) {
            const result = {}
            result['width'] = style['width'] + "px"
            result['height'] = style['height'] + "px"
            result['top'] = style['top'] + "px"
            result['left'] = style['left'] + "px"
            return result
        },
        组件点击(e, index) {
            if (this.组件列表[index].点击事件 == "") {
                return
            }
            let 动态脚本 = "this." + this.组件列表[index].点击事件 + "()"
            try {
                eval(动态脚本)
            } catch (e) {
                console.log("调用未定义函数", this.组件列表[index].点击事件)
            }
        }
    },
})