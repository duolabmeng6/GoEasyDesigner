import {ref} from 'vue'
import {defineStore} from 'pinia'
import {WindowGetSize} from "../../wailsjs/runtime";
import {E保存, E保存件对话框, E发送跳转代码到ide, E文件枚举, E读入文件} from "../../wailsjs/go/main/App";
import {生成提示辅助代码} from "@/提示语法生成器.js";
import {窗口事件代码模板} from "@/编辑器/窗口事件代码模板.js";
import {ElMessage} from "element-plus";
import {InsertCode, 取父目录, 生成辅助代码} from "@/public.js";

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
                项目根目录: "",
                设计文件路径: "",//"stores\\设计文件.json",
                窗口事件文件路径: "",//"stores\\窗口事件.js",
                辅助代码文件路径: "",//"stores\\辅助代码.js",
                项目管理目录: "",//"stores\\辅助代码.js",
                IDE插件地址: "http://127.0.0.1:17810",
            }),
            客户端模式: ref(false),
            list: ref(null),
            当前拖拽组件数据: ref(null),
            start_x: ref(0),
            start_y: ref(0),
            indexMap: ref({}),
            显示项目配置对话框: ref(false),
            项目文件列表: ref([]),
            代码编辑器内容: ref(""),
            当前代码编辑器路径: ref(""),
            选择夹_中间现行选中项: ref("0"),
            支持库列表: ref([]),
            帮助信息: ref("GoEasyDesigner 窗口设计师 轻松跨平台开发"),
            keywordMappings: ref(""),
            全局_事件名称列表: ref([]),
            代码编写模式: ref(1),//1:网页内代码编辑器 2:代码跳转至IDE
            运行按钮文本: ref("运行"),
            编译按钮文本: ref("编译"),
            调试信息: ref(""),
            选择夹_底部现行选中项: ref("0"),
        }
    },

    actions: {
        添加事件被选择(事件名称, item) {
            let dthis = this;
            if (事件名称 == "在此处选择加入事件处理函数") {
                return
            }
            if (this.代码编辑器内容 == "") {
                this.代码编辑器内容 = 窗口事件代码模板
            }
            let code = "item.事件" + 事件名称 + "=" + '"' + item.名称 + 事件名称 + '"'
            console.log("添加事件被选择", item.名称 + 事件名称)
            eval(code)
            let ncode = `
    c.{事件名称} = function () {
        console.log("{事件名称}")
    }
`;
            ncode = ncode.replace(/{事件名称}/g, item.名称 + 事件名称)
            console.log(ncode)

            if (this.项目信息.窗口事件文件路径 == "") {
                ElMessage({
                    message: "浏览器中运行无法保存请注意...",
                    type: 'success',
                    duration: 3000, // 设置显示时间为5秒，单位为毫秒
                });
                this.代码编辑器内容 = InsertCode(this.代码编辑器内容, ncode)
                this.选择夹_中间现行选中项 = "1"
                return;
            } else {
                //读入 窗口事件 文件内容
                this.保存设计文件()

                E读入文件(this.项目信息.窗口事件文件路径).then((res) => {
                    this.代码编辑器内容 = InsertCode(res, ncode)
                    this.选择夹_中间现行选中项 = "1"
                    E保存(this.项目信息.窗口事件文件路径, this.代码编辑器内容).then((res) => {
                        let 跳转位置 = this.代码编辑器内容.indexOf(ncode)
                        if (跳转位置 != -1) {
                            console.log("跳转位置", 跳转位置)
                            E发送跳转代码到ide(
                                dthis.项目信息.IDE插件地址,
                                dthis.项目信息.窗口事件文件路径,
                                跳转位置
                            )
                        }
                    })
                })

            }


            // try {
            //     // 替换 {事件名称} 为 事件名称
            //     console.log(this.项目信息.窗口事件文件路径)
            //     E创建函数(this.项目信息.窗口事件文件路径, ncode, this.项目信息.IDE插件地址).then(
            //         (res) => {
            //             console.log(res)
            //         }
            //     )
            //     // 保存()
            // } catch (e) {
            //     console.log("需要客户端中运行")
            // }

        },
        保存设计文件() {
            let store = this;
            let njson = JSON.stringify(store.list, null, 2)
            let 辅助代码 = 生成辅助代码(store.list[0].子组件)


            if (store.客户端模式 == false) {
                //浏览器打开就发起保存
                const blob = new Blob([njson], {type: 'application/json'})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = '设计文件.json'
                link.click()

                const blob2 = new Blob([辅助代码], {type: 'application/json'})
                const link2 = document.createElement('a')
                link2.href = URL.createObjectURL(blob2)
                link2.download = '辅助代码.js'
                link2.click()
                return;
            }

            // 客户端直接保存
            function _保存(p, d) {
                d = String(d)
                p = String(p)
                E保存(p, d)
            }

            if (store.项目信息.设计文件路径 == "") {
                E保存件对话框().then((res) => {
                    if (res == "") {
                        ElMessage({
                            message: "未选择文件",
                            type: 'success',
                            duration: 3000, // 设置显示时间为5秒，单位为毫秒
                        });
                        return
                    }

                    store.项目信息.设计文件路径 = res
                    store.项目信息.窗口事件文件路径 = 取父目录(res) + "/窗口事件.js"
                    store.项目信息.辅助代码文件路径 = 取父目录(res) + "/辅助代码.js"
                    store.项目信息.项目管理目录 = 取父目录(res)
                    store.项目信息.项目根目录 = 取父目录(取父目录(取父目录(取父目录(res))))

                    store.项目管理刷新()

                    console.log("窗口事件文件路径", store.项目信息.窗口事件文件路径)
                    if (store.代码编辑器内容 !== "") {
                        _保存(store.项目信息.窗口事件文件路径, store.代码编辑器内容)
                        _保存(store.项目信息.辅助代码文件路径, 辅助代码)
                    }
                    _保存(store.项目信息.设计文件路径, njson)
                })
                return
            }
            if (store.代码编辑器内容 !== "") {
                _保存(store.项目信息.窗口事件文件路径, store.代码编辑器内容)
                _保存(store.项目信息.辅助代码文件路径, 辅助代码)
            }
            _保存(store.项目信息.设计文件路径, njson)

        },
        组件双击事件(组件数据) {
            // console.log(this.全局_事件名称列表,this.全局_事件名称列表[1].value)
            this.添加事件被选择(this.全局_事件名称列表[1].value, 组件数据)
            let dthis;
            dthis = this
            生成提示辅助代码(this.list, function (res) {
                dthis.keywordMappings = res
            })

        },
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
        项目管理刷新() {
            if (this.项目信息.项目管理目录 == "" && this.项目信息.项目管理目录 == undefined) {
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
            console.log("项目文件列表", this.项目文件列表)
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