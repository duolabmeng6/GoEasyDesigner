import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import 组件数据 from '../组件列表.json'; // 根据实际文件路径进行修改

export const useCounterStore = defineStore('counter', {
    state: () => {
        let data = {}
        data.组件列表 = ref([])
        data.数据 = 组件数据
        console.log(data.数据.窗口.宽度)
        return data
    },
    actions: {
        初始化组件信息() {
            let 组件列表 = []
            for (var key in 组件数据) {
                if (key == "窗口") {
                    continue
                }
                组件列表.push(组件数据[key])
            }
            this.组件列表 = 组件列表

        },
        取窗口样式() {
            const result = {}
            result['width'] = 组件数据.窗口.宽度 + "px"
            result['height'] = 组件数据.窗口.高度 + "px"
            return result
        },
        按钮1被点击() {
            console.log("按钮1被点击了")
            console.log(this.数据.按钮1.标题)
            //this.按钮1.标题 = "祖国你好"

            this.数据.按钮1.标题 = "祖国你好222"
            this.数据.编辑框2.标题="abc"
            this.按钮
        }
    },
})