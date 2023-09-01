import {ref, nextTick} from 'vue'
import {defineStore} from 'pinia'
import {WindowGetSize} from "../../wailsjs/runtime";
import {E文件枚举} from "../../wailsjs/go/main/App";

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
            当前组件索引: ref("1"),
            组件列表: ref([]),
            项目信息: ref({
                设计文件路径: "",//"stores\\设计文件.json",
                窗口事件文件路径: "",//"stores\\窗口事件.js",
                辅助代码文件路径: "",//"stores\\辅助代码.js",
                项目管理目录: "",//"stores\\辅助代码.js",
                IDE插件地址: "http://127.0.0.1:10750",
            }),
            客户端模式: ref(false),
            list: ref(null),
            当前拖拽组件数据: ref(null),
            start_x: ref(0),
            start_y: ref(0),
            indexMap: ref({}),
            显示项目配置对话框: ref(false),
            项目文件列表: ref([]),
            代码编辑器内容:ref(""),
            当前代码编辑器路径 : ref(""),
            选择夹_中间现行选中项:ref("0"),
            支持库列表:ref([]),
            帮助信息:ref("GoEasyDesigner 窗口设计师 轻松跨平台开发"),
        }
    },

    actions: {
        初始化() {
            let dthis = this
            try {
                WindowGetSize().then(function (size) {
                })
                dthis.客户端模式 = true
            } catch (e) {
                dthis.客户端模式 = false
            }
            console.log("当前客户端模式", this.客户端模式)
        },
        项目管理刷新(){
            if (this.项目信息.项目管理目录=="" && this.项目信息.项目管理目录==undefined){
                return
            }
            let dthis;
            dthis = this
            E文件枚举(this.项目信息.项目管理目录).then((res) => {
                console.log(res)
                res.forEach((v, i) => {
                    //获取文件名
                    let 文件名 = v.split("/")
                    文件名 = 文件名[文件名.length - 1]

                    dthis.项目文件列表.push({
                                                label: 文件名,
                                                path: v,
                                            })
                })
            })
            console.log("项目文件列表", store.项目文件列表)
        },
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
            if (this.当前拖拽组件数据.组件名称 == "窗口") {
                return "窗口属性"
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

        递归查找名称(源数据, 名称) {
            let res = false
            源数据.forEach((item, index) => {
                if (item.名称 == 名称) {
                    res = true
                }
                if (item.子组件 == undefined) {

                } else {
                    res = this.递归查找名称(item.子组件, 名称)
                    return res
                }
            });
            return res
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
                        父容器id: id,
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
        },
        组件通过id查找结构(id) {
            console.log("组件通过id查找结构", id);
            return this.__组件通过id查找结构_递归(this.list, id);
        },
        __组件通过id查找结构_递归(源数据, id) {
            for (const item of 源数据) {
                if (item.id === id) {
                    return item;
                } else if (item.子组件) {
                    const 子结果 = this.__组件通过id查找结构_递归(item.子组件, id);
                    if (子结果) {
                        return 子结果;
                    }
                }
            }
            return null;
        },
        取组件列表() {
            this.组件列表 = []
            this.__取组件列表_递归(this.list);
            console.log("取组件列表", this.组件列表)
            return this.组件列表
        },
        __取组件列表_递归(源数据) {
            for (const item of 源数据) {
                const 组件数据 = {
                    label: item.名称,
                    id: item.id
                }
                if (item.名称 !== undefined && item.名称 !== null && item.名称 !== "") {
                    this.组件列表.push(组件数据)
                }

                console.log("组件列表", this.组件列表)

                if (item.子组件) {
                    this.__取组件列表_递归(item.子组件);
                }
            }
        }
    },
})