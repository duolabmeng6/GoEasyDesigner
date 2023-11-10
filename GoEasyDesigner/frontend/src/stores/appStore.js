import {ref} from 'vue'
import {defineStore} from 'pinia'
import {WindowGetSize} from "../../wailsjs/runtime";
import {E保存, E发送跳转代码到ide, E文件枚举, E读入文件} from "../../wailsjs/go/main/App";
import {生成提示辅助代码} from "@/提示语法生成器.js";
import {窗口事件代码模板} from "@/编辑器/窗口事件代码模板.js";
import {ElMessage} from "element-plus";
import {InsertCode} from "@/public.js";
import {appAction} from '@/action/app.js';
import {HistoryManagerLiving} from '@/stores/HistoryManager.js';
import {useI18n} from "vue-i18n";
import i18n from "../i18n";

export const useAppStore = defineStore('AppStore', {
    state: () => {
        return {
            bodyLoaded: ref(false),
            hoveredDiv: ref(null),
            当前组件索引: ref("1"),
            组件列表: ref([]),
            项目信息: ref({
                项目根目录: "",
                设计文件路径: "",//"win\\design.json",
                窗口事件文件路径: "",//"win\\event.js",
                辅助代码文件路径: "",//"win\\__aux_code.js",
                项目管理目录: "",//"win\\",
                IDE插件地址: "http://127.0.0.1:17810",
            }),
            代码编辑器: ref({
                路径: "",
                文件时间: "",
                内容: "",
            }),
            客户端模式: ref(false),
            list: ref(null),
            当前拖拽组件数据: ref(null),
            当前多选组件ID: ref([]),
            start_x: ref(0),
            start_y: ref(0),
            indexMap: ref({}),
            显示项目配置对话框: ref(false),
            项目文件列表: ref([]),
            选择夹_中间现行选中项: ref("0"),
            支持库列表: ref([]),
            帮助信息: ref("Welcome to use GoEasyDesigner"),
            keywordMappings: ref(""),
            全局_事件名称列表: ref([]),
            代码编写模式: ref(1),//1:网页内代码编辑器 2:代码跳转至IDE
            运行按钮文本: ref("运行"),
            编译按钮文本: ref("编译"),
            调试信息: ref(""),
            选择夹_底部现行选中项: ref("0"),

            组件列表tree现行选中项: ref(""),
            组件列表tree: ref([]),
            scrollContainer: ref(null),
            releases_latest: {},//github的文件信息
            window下载地址: "",//github的文件信息
            mac下载地址: "",//github的文件信息
            版本号: "",//github的文件信息
            是否为window系统: true,//github的文件信息
            HistoryManager: HistoryManagerLiving,
            putPosition: {},
            rightClickMenus:ref({}),
        }
    },

    actions: {
        添加事件被选择: async function (事件名称, 函数名称, item, extData) {
            let dthis = this;
            if (this.代码编辑器.内容 == "") {
                this.代码编辑器.内容 = 窗口事件代码模板
            }
            let code = `item.event_${事件名称} = "${函数名称}"`
            eval(code)
            let ncode = '';
            if (extData == undefined) {
                ncode = `
    c.${函数名称} = async function () {
        console.log("${函数名称}")
        
    }
`;
            } else {
                ncode = `
    c.${函数名称} = async function ` + extData + ` {
        console.log("${函数名称}")
        
    }
`;
            }

            ncode = ncode.replace(/{事件名称}/g, item.name + 事件名称)
            console.log(ncode)

            if (this.项目信息.窗口事件文件路径 == "") {
                ElMessage({
                    message: "浏览器中运行无法保存请注意...",
                    type: 'success',
                    duration: 3000, // 设置显示时间为5秒，单位为毫秒
                });
                this.代码编辑器.内容 = InsertCode(this.代码编辑器.内容, ncode)
                this.选择夹_中间现行选中项 = "1"
                this.putPosition(ncode)


                return;
            }
            //读入 窗口事件 文件内容
            dthis.代码编辑器.内容 = InsertCode(this.代码编辑器.内容, ncode)
            dthis.选择夹_中间现行选中项 = "1"
            this.putPosition(ncode)

            await appAction.保存设计文件()

            let 跳转位置 = dthis.代码编辑器.内容.indexOf(ncode)
            if (跳转位置 != -1) {
                console.log("跳转位置", 跳转位置)
                E发送跳转代码到ide(
                    dthis.项目信息.IDE插件地址,
                    dthis.项目信息.窗口事件文件路径,
                    跳转位置
                )
            }

        },

        组件双击事件(组件数据) {
            // console.log(this.全局_事件名称列表,this.全局_事件名称列表[1].value)
            let 事件名称 = this.全局_事件名称列表[0].value
            let ext_data = this.全局_事件名称列表[0].ext_data
            let nowSelectItem = this.全局_事件名称列表[0]
            let 函数名称;
            if (i18n.global.locale.value === "简体中文") {
                函数名称 = 组件数据.name + nowSelectItem.label
            } else {
                let 新事件名称 = nowSelectItem.value.toLowerCase().replace(/\b(\w)|\s(\w)/g, function (m) {
                    return m.toUpperCase();
                });
                函数名称 = 组件数据.name + 新事件名称
            }

            this.添加事件被选择(事件名称, 函数名称, 组件数据, ext_data)
            let dthis;
            dthis = this
            生成提示辅助代码(this.list, function (res) {
                console.log("最终辅助代码", res)
                dthis.keywordMappings = res
            })

        },
        init() {
            let dthis = this
            const {t} = useI18n() // 解构出t方法

            this.运行按钮文本 = t("app.run");
            this.编译按钮文本 = t("app.compile");
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

        当前组件名称() {
            console.log("当前组件索引", this.当前组件索引)
            if (this.当前组件索引 == -1) {
                return "画布属性"
            }
            return this.组件列表[this.当前组件索引].componentName + "属性"
        },

        当前组件名称2() {
            const {t} = useI18n() // 解构出t方法

            if (this.当前拖拽组件数据.componentName == t('componentName.Window')) {
                return "WindowAttr"
            }

            return this.当前拖拽组件数据.componentName + "Attr"
        },
        获取索引(组件名称) {
            let k = this._获取索引(组件名称)
            //避免名称重复导致后续代码出问题
            for (let i = 0; i < 100; i++) {
                let 名称是否存在 = this.递归查找名称(this.list, 组件名称 + k)
                // console.log("名称是否存在", 名称是否存在)
                if (名称是否存在) {
                    k = this._获取索引(组件名称)
                } else {
                    break
                }
            }
            return k
        },
        _获取索引(名称) {
            // console.log(this.indexMap[名称])
            if (this.indexMap[名称] === undefined) {
                this.indexMap[名称] = 1;
            } else {
                this.indexMap[名称]++;
            }
            // console.log("获取索引", 名称, this.indexMap[名称], this.indexMap)
            return 名称 + this.indexMap[名称];
        },
        获取随机id() {
            //生成6为随机数
            let random = Math.floor(Math.random() * 1000000);
            // 保留6位字符串
            return ("id-" + random).substring(0, 8);
        },


        递归删除id(源数据, id) {
            // this.HistoryManager.记录(JSON.stringify(this.list))
            this.HistoryManager.记录(JSON.stringify(this.list))

            this.__递归删除id(源数据, id)
            this.当前组件索引 = "1"
            this.当前拖拽组件数据 = this.组件通过id查找结构("1")
            this.取组件列表()
        },
        __递归删除id(源数据, id) {
            if (id == 1) {
                console.log("不能把自己窗口删除了")
                return
            }
            // console.log("递归删除", 源数据, id)
            源数据.forEach((item, index) => {
                if (item.id == id) {
                    源数据.splice(index, 1);
                    return
                }
                if (item.childComponents == undefined) {

                } else {
                    this.递归删除id(item.childComponents, id)
                }
            });
        },

        递归查找名称(源数据, 名称) {
            let res = false
            源数据.forEach((item, index) => {
                if (item.name == 名称) {
                    res = true
                }
                if (item.childComponents == undefined) {

                } else {
                    res = this.递归查找名称(item.childComponents, 名称)
                    return res
                }
            });
            return res
        },

        新增childComponents(id) {
            let 插入数据 = {
                id: this.获取随机id(),
                name: this.获取索引("ContentArea"),
                text: this.获取索引("tabs"),
                componentName: "elContainer",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                noPlace: false,
                noDrag: true,
                visible: true,
                disable: false,
                pid: id,
                childComponents: []
            }
            this.递归添加(this.list, 插入数据, id)
        },

        新增childComponents2(id) {
            let 插入数据 = {
                id: this.获取随机id(),
                componentName: "elContainer",
                name: this.获取索引("ContentArea"),
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                // background: "#fff",
                position: "relative",
                noPlace: false,
                noDrag: true,
                visible: true,
                disable: false,
                pid: id,
                zIndex: 0,
                占比: 8,
                childComponents: []
            }
            this.递归添加(this.list, 插入数据, id)
        },

        递归添加(源数据, 插入数据, id) {
            // console.log("递归添加", 源数据, 插入数据, id)
            源数据.forEach((item, index) => {
                if (item.childComponents == undefined) {

                } else {
                    if (item.id == id) {
                        item.childComponents = [...item.childComponents, 插入数据]
                        return true

                    } else {
                        this.递归添加(item.childComponents, 插入数据, id)
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
                } else if (item.childComponents) {
                    const 子结果 = this.__组件通过id查找结构_递归(item.childComponents, id);
                    if (子结果) {
                        return 子结果;
                    }
                }
            }
            return null;
        },
        transformData(jsonData) {
            function transform(item) {
                let 名称;
                名称 = item.name
                if (名称 == undefined || 名称 == null || 名称 == "") {
                    名称 = item.text
                }
                const newItem = {
                    id: item.id,
                    value: item.id,
                    label: 名称,
                    children: []
                };

                if (item.childComponents) {
                    item.childComponents.forEach(child => {
                        let 名称;
                        名称 = child.name
                        if (名称 == undefined || 名称 == null || 名称 == "") {
                            名称 = child.text
                        }
                        if (名称) {
                            const childItem = transform(child);
                            newItem.children.push(childItem);
                        }
                    });
                }

                return newItem;
            }

            const result = jsonData.map(item => transform(item));
            return result;
        },
        取组件列表() {
            this.组件列表 = [];
            this.组件列表tree = [];

            this.__取组件列表_递归(this.list);
            // console.log("取组件列表", this.组件列表)

            const testlist = this.transformData(this.list);
            // console.log("取组件列表", JSON.stringify(testlist, null, 2))
            this.组件列表tree = testlist
            // console.log("组件列表tree现行选中项", this.组件列表tree现行选中项)
            return this.组件列表
        },
        __取组件列表_递归(源数据) {
            for (const item of 源数据) {
                const 组件数据 = {
                    label: item.name,
                    id: item.id
                }
                if (item.name !== undefined && item.name !== null && item.name !== "") {
                    this.组件列表.push(组件数据)
                }
                // console.log("组件列表", this.组件列表)
                if (item.childComponents) {
                    this.__取组件列表_递归(item.childComponents);
                }
            }
        }
    },
})