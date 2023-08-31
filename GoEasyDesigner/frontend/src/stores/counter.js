import {ref, nextTick} from 'vue'
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
            indexMap: ref({}),
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
        },

        当前组件名称2() {
            console.log("this.当前拖拽组件数据.组件名称", this.当前拖拽组件数据.组件名称)
            if (this.当前拖拽组件数据.组件名称 =="窗口") {
                return "布局容器属性"
            }
            return this.当前拖拽组件数据.组件名称 + "属性"
        },

        获取索引(名称) {
            console.log(this.indexMap[名称])
            if (this.indexMap[名称] === undefined) {
                this.indexMap[名称] = 1;
            } else {
                this.indexMap[名称]++;
            }
            console.log("获取索引", 名称, this.indexMap[名称], this.indexMap)
            return this.indexMap[名称];
        },
        获取随机id() {
            //生成6为随机数
            let random = Math.floor(Math.random() * 1000000);
            // 保留6位字符串
            return ("id-" + random).substring(0, 8);
        },


        递归删除id(源数据, id) {
            // console.log("递归删除", 源数据, id)
            源数据.forEach((item, index) => {
                if (item.id == id) {
                    源数据.splice(index, 1);
                    return
                }
                if (item.子组件 == undefined) {

                } else {
                    this.递归删除id(item.子组件, id)
                }
            });
        },

        新增子组件(id) {
            let 插入数据 = {
                标题: "选项卡" + this.获取索引(id + "选项卡"),
                id: this.获取随机id(),
                子组件: [
                    {
                        id: this.获取随机id(),
                        名称: '选择夹',
                        组件名称: "布局容器",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        禁止放置: false,
                        禁止拖动: true,
                        可视: true,
                        禁止: false,
                        子组件: []
                    },

                ]
            }
            this.递归添加(this.list, 插入数据, id)

        },
        递归添加(源数据, 插入数据, id) {
            // console.log("递归添加", 源数据, 插入数据, id)
            源数据.forEach((item, index) => {
                if (item.子组件 == undefined) {

                } else {
                    if (item.id == id) {
                        item.子组件 = [...item.子组件, 插入数据]
                        return true

                    } else {
                        this.递归添加(item.子组件, 插入数据, id)
                    }
                }
            });
            return false
        }
    },
})