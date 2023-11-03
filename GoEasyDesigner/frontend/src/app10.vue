<template>
  <div class="grid" style="
    width:100vw;
    height: 100vh;
    display: grid;
    grid-template-areas: 'header toolbtn toolbtn'
    'left main right'
    'footer footer footer';
    ;
    grid-template-columns: auto 6fr 2fr;
    grid-template-rows: 0.5fr 9fr 1.5fr;
    overflow: hidden;
    gap: 12px;
    padding: 8px;
  ">
    <div id="header" style="grid-area: header;">
      <div style="
      display: grid;
      justify-items: center;
      align-items: center;
      height: 100%;
">
        <div class="text-2xl" style="color:#383838;">窗口设计师<span class="text-[9px]"
                                                                     style="color: #999999">v1.0.0</span></div>
      </div>
    </div>
    <div id="toolbtn" style="grid-area: toolbtn">
      <div style="
      display: grid;
      justify-items: start;
      align-items: center;
      height: 100%;
">
        <ToolBtn/>
      </div>
    </div>
    <div id="left" ref="tabLeftRef" style="
      grid-area: left;
      min-width:300px;
      width:300px;
      overflow: hidden;
      box-shadow: 5px 5px 10px #e5e5e5;
      position: relative;
    ">
      <t-tabs v-model="tabLeftVal" style="height: 100%" theme="card">
        <t-tab-panel label="属性" style="height: 100%" value="0">

          <ComponentLeft v-if="store" :store="store"/>

        </t-tab-panel>
        <t-tab-panel label="支持库" value="1">
          <p style="padding: 25px">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel label="项目管理" value="2">
          <p style="padding: 25px">选项卡3</p>
        </t-tab-panel>
      </t-tabs>
      <DraggableDivider :target-element-id="'left'"></DraggableDivider>

    </div>
    <div id="main" ref="tabMainRef" style="grid-area: main;
      box-shadow: 5px 5px 10px #e5e5e5;
      position: relative;
">
      <t-tabs v-model="tabMainVal" style="height: 100%" theme="card">
        <t-tab-panel label="设计界面" style="height: 100%" value="0">

          <div id="designer" style="position: relative;    margin: 8px;"
          >
            <component is="RenderDesignComponent" v-for="(item, index) in store.list" :key="index" :item="item"/>
          </div>

        </t-tab-panel>
        <t-tab-panel label="代码编辑" value="1">
          <div style="width: 100%;height: 1000px;">
            <component is="代码编辑器" v-model:value="store.代码编辑器内容"
                       height="100%"
            />
          </div>

        </t-tab-panel>
      </t-tabs>


    </div>
    <div id="right" style="grid-area: right;min-width:240px;
      box-shadow: 5px 5px 10px #e5e5e5;
      position: relative;
">
      <DraggableDivider :target-element-id="'right'" direction="left"></DraggableDivider>

      <t-tabs v-model="tabRightVal" style="height: 100%" theme="card">

        <t-tab-panel class="tab-right" label="系统组件" style="height: 100%;
" value="0">
          <div style="padding: 8px 8px">
            <ComponentTreeSelectBox style="width: 100%"/>
          </div>
          <t-collapse :default-value="[0]" borderless="true" @change="handlePanelChange">
            <t-collapse-panel destroy-on-collapse header="布局容器">
              <div style="display: grid;
grid-template-columns: 1fr 1fr;
gap: 4px;
">

                <t-button v-for="(item, index) in BoxComponentNames_el" block draggable="true"
                          style="color: #383838"
                          variant="outline"
                          @dragstart="uiDragStart($event, item,'el')"
                >
                  <template #icon>
                    <add-icon/>
                  </template>
                  {{ item }}
                </t-button>

              </div>

            </t-collapse-panel>
            <t-collapse-panel destroy-on-collapse header="功能组件">
            </t-collapse-panel>
            <t-collapse-panel destroy-on-collapse header="数据容器">
            </t-collapse-panel>
          </t-collapse>

        </t-tab-panel>
        <t-tab-panel label="自定义组件" value="1">
        </t-tab-panel>

      </t-tabs>

    </div>
    <div id="footer" style="grid-area: footer;
position: relative;
      box-shadow: 5px 5px 10px #e5e5e5;

">

      <DraggableDivider :target-element-id="'footer'" direction="top"></DraggableDivider>

      <t-tabs v-model="tabFooterVal" style="height: 100%" theme="card">
        <t-tab-panel label="帮助信息" style="height: 100%" value="0">
        </t-tab-panel>
        <t-tab-panel label="调试信息" value="1">
          <p style="padding: 25px">选项卡2</p>
        </t-tab-panel>
      </t-tabs>
    </div>

  </div>
</template>

<style>
.tab-right .t-collapse-panel__wrapper .t-collapse-panel__body {
  background: #FFF !important;
}

.tab-right .t-collapse-panel__wrapper .t-collapse-panel__content {
  padding: 8px;
  display: grid;
  align-items: center;
  justify-content: center;
}

.t-collapse-panel__wrapper .t-collapse-panel__header {
  font-size: 12px !important;
  font-weight: normal !important;
}
</style>

<script setup>
import {ref, nextTick, onMounted, inject} from "vue";
import ComponentLeft from "./components/designer/left/ComponentLeft.vue";
import {AddIcon} from "tdesign-icons-vue-next";
import ToolBtn from "./components/designer/header/ToolBtn.vue";
import ComponentTreeSelectBox from "./components/designer/left/TreeSelectBox.vue";
import DraggableDivider from "./components/designer/public/DraggableDivider.vue";
import {MessagePlugin} from 'tdesign-vue-next';
import {useAppStore} from "./stores/appStore.js";
import {appAction} from '@/action/app.js';
import {ElMessage} from "element-plus";
import {E保存, E取配置信息} from "../wailsjs/go/main/App";
import releases_latest from "../public/releases_latest.json";


const store = useAppStore()
store.init()

const tabLeftVal = ref('0');
const tabRightVal = ref('0');
const tabFooterVal = ref('0');
const tabMainVal = ref('0')
const currentItem = ref([0]);
const tabLeftRef = ref(null)
const tabMainRef = ref(null)

const handlePanelChange = (val) => {
  currentItem.value = val;
};

async function ReSize() {
  await nextTick()
  let contentHeight = tabLeftRef.value.clientHeight
  let headerHeight = tabLeftRef.value.querySelector('.t-tabs__header').clientHeight
  // console.log("headerHeight", headerHeight)
  // console.log("contentHeight", contentHeight)
  tabLeftRef.value.querySelector('.t-tabs__content').style.height = (contentHeight - headerHeight) + 'px'

  tabMainRef.value.querySelector('.t-tabs__content').style.height = (contentHeight - headerHeight) + 'px'

}

function init_tailwindcss() {

  const script = document.createElement('script')
  script.src = '/cdn.tailwindcss.com_3.3.3.js'
  document.body.appendChild(script)
  script.onload = () => {
    console.log('tailwindcss.com_3.3.3.js 加载完成')
    tailwind.config = {
      plugins: [
        function ({addBase}) {
          addBase({
            ".el-button": {
              "background-color": "var(--el-button-bg-color,var(--el-color-white))"
            }
          });
        }
      ]
    }
  }

}

onMounted(() => {
  console.log("重新加载")
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
  版本号自动检测()


  ReSize()
  window.addEventListener('resize', function () {
    console.log("重新计算高度")
    ReSize()
  })
  init_tailwindcss()
})

const BoxComponentDefaultValue_el = inject("BoxComponentDefaultValue_el")
console.log("BoxComponentDefaultValue_el", BoxComponentDefaultValue_el)

function uiDragStart(event, 组件名称, uiName) {
  let 新属性 = {}
  try {
    if (uiName == "el") {
      新属性 = JSON.parse(JSON.stringify(BoxComponentDefaultValue_el[组件名称]))
    }
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
    let 名称是否存在 = store.递归查找名称(store.list,   k)
    // console.log("名称是否存在", 名称是否存在)
    if (名称是否存在) {
      k = store.获取索引(组件名称)
    } else {
      break
    }
  }

  新属性.componentName = 组件名称
  新属性.名称 = 组件名称 + k
  新属性.标题 = 组件名称 + k
  新属性.componentName = uiName + 组件名称

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
  if ((event.metaKey || event.ctrlKey) && event.key === "z") {
    //撤销
    console.log("撤销");
    //屏蔽浏览器默认行为
    event.preventDefault();

    // console.log("store.HistoryManager.查看当前历史所有记录()", store.HistoryManager.查看当前历史所有记录())
    // console.log("store.HistoryManager.当前位置()", store.HistoryManager.当前位置)


    let 旧的数据 = store.HistoryManager.撤销(JSON.stringify(store.list))
    // console.log("旧的数据", 旧的数据)
    if (旧的数据 == null || 旧的数据 == undefined) {
      return
    }

    store.list = JSON.parse(旧的数据)

  }
  if ((event.metaKey || event.ctrlKey) && event.key === "y") {
    //恢复
    console.log("恢复");
    event.preventDefault();
    let 旧的数据 = store.HistoryManager.恢复(JSON.stringify(store.list))
    // console.log("旧的数据", 旧的数据)
    if (旧的数据 == null || 旧的数据 == undefined) {
      return
    }
    store.list = JSON.parse(旧的数据)
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

function 版本号自动检测() {
  function 版本信息(releases_latest) {
    for (const asset of releases_latest[0].assets) {
      // console.log(asset.name)
      // console.log(asset.browser_download_url)
      if (asset.name.includes(".exe")) {
        store.window下载地址 = "https://ghproxy.com/" + asset.browser_download_url
      }
      if (asset.name.includes(".dmg")) {
        store.mac下载地址 = "https://ghproxy.com/" + asset.browser_download_url
      }

    }
    store.版本号 = releases_latest[0].tag_name
    store.releases_latest = releases_latest
  }

  版本信息(releases_latest)
  //网络读取最新的
  if (!store.客户端模式) {
    fetch('./releases_latest.json')
        .then(response => response.json())
        .then(data => {
          // 在这里处理获取到的数据
          // console.log(data);
          版本信息(data)
        })
        .catch(error => {
          // 处理错误
          console.error('Error fetching data:', error);
        });
  }
}


</script>
