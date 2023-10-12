<template>

  <div class="container" style="margin: 0px 4px">
    <div class="头部 "></div>
    <div class="属性框 clear-select">
      <el-tabs style="height: 100%" type="border-card">
        <el-tab-pane label="属性" style="height: 100%;">
          <div class="container2" style="margin: 8px 4px">
            <div v-if="store.当前拖拽组件数据 != undefined" class="组件列表">
              <el-tree-select
                  v-model="store.当前组件索引"
                  :data="store.组件列表tree"
                  default-expand-all
                  style="width: 100%;"
                  @node-click="data=>组件树选中(data)"
              />

            </div>
            <component :is="store.当前组件名称2()"
                       v-if="store.当前拖拽组件数据 != undefined"
                       :item="store.当前拖拽组件数据"

            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="支持库">
          <component is="支持库"/>
        </el-tab-pane>
        <el-tab-pane label="项目管理">
          <component is="项目管理"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="设计区域">
      <el-col :span="24" style="height: 100%">
        <el-tabs v-model="store.选择夹_中间现行选中项" style="height: 100%" tab-position="top" type="border-card">
          <el-tab-pane label="界面设计">
            <div id="designer" style="position: relative;    margin: 8px;"
            >
              <component is="渲染组件" v-for="(item, index) in store.list" :key="index" :item="item"/>
            </div>
          </el-tab-pane>
          <el-tab-pane label="编辑代码">

            <component is="代码编辑器" v-model:value="store.代码编辑器内容"
                       height="100%"
            />

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
    <div class="工具箱 clear-select">
      <el-tabs class="demo-tabs" style="height: 100%" tab-position="top" type="border-card">
        <el-tab-pane label="组件">
          <el-collapse accordion model-value="1" style="border: none;padding: 0px 8px">
            <el-collapse-item name="1" title="系统组件">
              <el-row>
                <el-col v-for="(item, index) in 组件名称列表" :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" draggable="true"
                             style="width: 100%;"
                             @dragstart="拖拽开始($event, item)"
                  >
                    {{ item }}
                  </el-button>

                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="2" title="数据展示组件">

            </el-collapse-item>
            <el-collapse-item name="3" title="自定义组件">

            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="调试信息">
      <el-tabs v-model="store.选择夹_底部现行选中项" class="demo-tabs" style="height: 100%" tab-position="top"
               type="border-card">
        <el-tab-pane label="帮助信息">
          <p v-if="!store.客户端模式">
            在浏览器中仅可保存设计界面,项目需要手动创建,
            <el-link href="https://github.com/duolabmeng6/GoEasyDesigner">前往查看项目创建教程 Github GoEasyDesigner
            </el-link>
            <br>
            建议下载客户端体验更佳
            <el-link href="https://github.com/duolabmeng6/GoEasyDesigner/releases">前往下载 Github Releases</el-link>
          </p>

          <div ref="scrollContainer" style="height: 100px;overflow-y: auto"
               v-html="store.帮助信息"
          ></div>

        </el-tab-pane>
        <el-tab-pane label="调试信息">
          <div ref="scrollContainer" style="height: 100px;overflow-y: auto"
               v-html="store.调试信息"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="标题 clear-select">
      <el-text size="large" style="">
        <el-icon>
          <Sunny/>
        </el-icon>
        窗口设计师
      </el-text>
    </div>
    <div class="工具条 clear-select">
      <el-button-group class="" style="margin-left: -7px;">
        <el-button :icon="Edit" @click="appAction.新建()">新建</el-button>
        <el-button :icon="Open" @click="appAction.打开">打开</el-button>
        <el-button :icon="Coin" @click="appAction.保存设计文件()">保存</el-button>
        <el-button :icon="Key" @click="appAction.运行()">{{ store.运行按钮文本 }}</el-button>
        <el-button :icon="Key" @click="appAction.编译()">{{ store.编译按钮文本 }}</el-button>
        <el-button v-if="store.客户端模式" :icon="Tools" @click="e => store.显示项目配置对话框 = true">项目配置
        </el-button>
        <el-button :icon="Help" @click="appAction.帮助()">帮助</el-button>
        <el-button :icon="Help" @click="appAction.运行环境检测()">运行环境检测</el-button>
        <el-button v-if="store.客户端模式" :icon="Help" @click="appAction.检查更新()">检查更新</el-button>
        <el-button v-if="!store.客户端模式" :icon="Help" @click="appAction.下载客户端()">下载客户端
        </el-button>
      </el-button-group>
    </div>
  </div>
  <component is="项目配置对话框" v-model="store.显示项目配置对话框" @确定="store.显示项目配置对话框=false"
             @关闭="store.显示项目配置对话框=false"></component>
</template>

<script setup>
import {ref, inject, onMounted, nextTick} from 'vue';
import {useCounterStore} from '@/stores/counter'
import {ElMessage} from "element-plus";
import {Edit, Open, Help, Tools, Bowl, Key, Coin} from "@element-plus/icons-vue";
import {appAction} from '@/action/app9.js';

import {
  E保存,
  E保存件对话框,
  E创建函数,
  E打开文件对话框,
  E读入文件,
  E运行命令,
  E停止命令,
  E取配置信息,
  E检查更新

} from "../wailsjs/go/main/App";
import {取父目录, 生成辅助代码} from "@/public";
import Shape from "@/components/Shape.vue";
import {BrowserOpenURL, EventsOn} from "../wailsjs/runtime";

const store = useCounterStore()
store.初始化()
const 创建组件属性默认值 = inject("创建组件属性默认值")
onMounted(() => {
  appAction.init()
  appAction.新建()
  store.取组件列表()
  store.当前拖拽组件数据 = store.组件通过id查找结构("1")
  try {
    E取配置信息().then((res) => {
      res = JSON.parse(res)
      console.log("取配置信息", res)
      store.项目信息.IDE插件地址 = "http://127.0.0.1:" + res.IDE插件端口号
      store.项目信息.设计文件路径 = res.设计文件路径
      if (store.项目信息.设计文件路径 != "") {
        appAction._打开文件加载界面(store.项目信息.设计文件路径)
      }

    })
  } catch (e) {

  }
  console.log("store.当前组件索引", store.当前组件索引)
  document.addEventListener("keydown", handleKeyDown);

  setTimeout(() => {
    store.bodyLoaded = true
  }, 200)
})


function 拖拽开始(event, 组件名称) {
  let 新属性 = ""
  try {
    新属性 = JSON.parse(JSON.stringify(创建组件属性默认值[组件名称]))
  } catch (e) {
  }
  if (新属性 == "") {
    console.log("未配置默认属性")
    //弹出提示
    ElMessage({
      message: "组件未配置默认属性",
      type: 'success',
      duration: 3000, // 设置显示时间为5秒，单位为毫秒
    });
    //阻止默认行为和停止事件
    event.preventDefault()
    event.stopPropagation()
    return
  }
  let k = store.获取索引(组件名称)

  新属性.id = store.获取随机id()

  //避免名称重复导致后续代码出问题
  for (let i = 0; i < 100; i++) {
    let 名称是否存在 = store.递归查找名称(store.list, 组件名称 + k)
    console.log("名称是否存在", 名称是否存在)
    if (名称是否存在) {
      k = store.获取索引(组件名称)
    } else {
      break
    }
  }

  新属性.组件名称 = 组件名称
  新属性.名称 = 组件名称 + k
  新属性.标题 = 组件名称 + k

  if (组件名称 == "按钮") {
  }
  if (组件名称 == "布局容器") {
    新属性.border = "1px solid black"
  }
  if (组件名称 == "选择夹") {
    let id = 新属性.id
    for (var i = 0; i < 2; i++) {
      新属性.子组件[i].id = store.获取随机id()
      新属性.子组件[i].名称 = "内容区域" + store.获取索引("内容区域")
      新属性.子组件[i].标题 = "选项卡" + store.获取索引("选项卡")
      新属性.子组件[i].父容器id = id
    }
  }
  if (组件名称 == "开关") {
  }
  if (组件名称 == "编辑框") {
    新属性.内容 = 新属性.标题
  }

  if (组件名称 == "弹性布局") {
    let id = 新属性.id
    for (var i = 0; i < 3; i++) {
      新属性.子组件[i].id = store.获取随机id()
      新属性.子组件[i].名称 = "内容区域" + store.获取索引("内容区域")
      新属性.子组件[i].父容器id = id
    }
  }

  if (组件名称 == "常用布局") {
    let id = 新属性.id
    var i = 0;
    新属性.子组件[i].id = store.获取随机id()
    新属性.子组件[i].名称 = "内容区域header" + store.获取索引("内容区域header")
    新属性.子组件[i].父容器id = id
    i++;
    新属性.子组件[i].id = store.获取随机id()
    新属性.子组件[i].名称 = "内容区域main" + store.获取索引("内容区域main")
    新属性.子组件[i].父容器id = id
    i++;
    新属性.子组件[i].id = store.获取随机id()
    新属性.子组件[i].名称 = "内容区域footer" + store.获取索引("内容区域footer")
    新属性.子组件[i].父容器id = id
    i++;
    新属性.子组件[i].id = store.获取随机id()
    新属性.子组件[i].名称 = "内容区域aside" + store.获取索引("内容区域aside")
    新属性.子组件[i].父容器id = id
    i++;
  }

  store.当前拖拽组件数据 = 新属性
}

function handleKeyDown(event) {
  // 如果按下的是Cmd + S（Mac）或Ctrl + S（Windows/Linux）
  console.log("按下某键盘", event.key)
  // 键盘按下(event, store.当前组件索引)
  if (event.key === "Delete") {
    event.preventDefault(); // 阻止浏览器默认保存行为
    // 在这里执行你想要的操作，比如保存数据或触发特定的方法
    console.log("按下了删除 Delete", store.当前拖拽组件数据);

    store.递归删除id(store.list, store.当前组件索引)


  }

  if ((event.metaKey || event.ctrlKey) && event.key === "s") {
    event.preventDefault(); // 阻止浏览器默认保存行为
    // 在这里执行你想要的操作，比如保存数据或触发特定的方法
    console.log("按下了保存 Cmd/Ctrl + S");
    if (store.客户端模式 == false) {
      //弹出消息框 当前为浏览器模式 不能保存 请手动保存
      ElMessage({
        message: "当前为浏览器模式 不能保存 请手动保存. 如果需要保存请使用客户端",
        type: 'success',
        duration: 3000, // 设置显示时间为5秒，单位为毫秒
      });
      return
    }

    if (store.项目信息.窗口事件文件路径 != "") {
      E保存(store.项目信息.窗口事件文件路径, store.代码编辑器内容).then((res) => {
        console.log(res)
        ElMessage({
          message: res,
          type: 'success',
          duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
      })
    }
  }
}

function 组件树选中(data) {
  store.当前拖拽组件数据 = store.组件通过id查找结构(data.id)
  console.log('组件树选中', store.当前拖拽组件数据)
  store.当前组件索引 = store.当前拖拽组件数据.id
}

</script>

<style>
.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}

.clear-select {
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer / Edge */
}

</style>