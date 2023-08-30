import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            画布属性: {
                width: ref(600),
                height: ref(400),
                left: ref(0),
                top: ref(0),
                可视化: ref(true),
                名称: ref("窗口"),
                标题: ref("窗口"),
            },
            当前组件索引: ref("-1"),
            组件列表: ref([]),
            项目信息: ref({
                设计文件路径: "",//"stores\\组件数据.json",
                窗口事件文件路径: "",//"stores\\窗口事件.js",
                IDE插件地址: "http://127.0.0.1:10750",
            }),
            客户端模式: ref(false),
            list: ref(null),
            当前拖拽组件数据: ref(null),
            start_x: ref(0),
            start_y: ref(0),
        }
    },

    actions: {
        取窗口样式() {
            const result = {}
            result['width'] = this.画布属性.width + "px"
            result['height'] = this.画布属性.height + "px"
            return result
        },
        当前组件名称() {
            console.log("当前组件索引", this.当前组件索引)
            if (this.当前组件索引 == -1) {
                return "画布属性"
            }
            return this.组件列表[this.当前组件索引].组件名称 + "属性"

        }
    },
})