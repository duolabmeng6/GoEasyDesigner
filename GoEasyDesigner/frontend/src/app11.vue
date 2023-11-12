<template>

  <div class="app" style="margin: 0px 4px">
    <div class="头部 "></div>
    <div id="left" class="属性框 clear-select">

      <el-tabs style="height: 100%" type="border-card">
        <DraggableDivider :target-element-id="'left'"></DraggableDivider>

        <el-tab-pane id="tabLeftAttrPane" :label="$t('app.Attribute')" style="height: 100%;" :style="{
          height: tabContentHight + 'px',
        }">
          <div id="tabLeftAttr" class="app2" style="height: 100%;">
            <div v-if="store.当前拖拽组件数据 != undefined" class="组件列表"
                 style="padding-top: 10px; padding-left: 6px; padding-right: 6px;">
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
        <el-tab-pane :label="$t('app.support_library')">
          <div id="tabLeftSuper" style="width: 100%;overflow: auto">
            <component is="支持库"/>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('app.project_management')">
          <div id="tabLeftProject" style="width: 100%;overflow: auto">
            <component is="项目管理"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="tabMainVal" ref="tabMainVal" class="设计区域">
      <el-col :span="24" style="height: 100%">
        <el-tabs v-model="store.选择夹_中间现行选中项" style="height: 100%"
                 tab-position="top" type="border-card" @tab-change="appAction.设计区域被改变">
          <el-tab-pane :label="$t('app.design')" style="overflow: auto">
            <div id="designer" style="position: relative;    margin: 8px;"
            >
              <component is="RenderDesignComponent" v-for="(item, index) in store.list" :key="index" :item="item"/>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('app.edit_code')" style="overflow: auto">
            <div id="codeEdit" style="position: relative;    margin: 8px;"
            >
              <component
                  ref="codeEditorRef"
                  is="代码编辑器" v-model:value="store.代码编辑器.内容"
                  height="100%"
              />
            </div>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
    <div id="right" class="工具箱 clear-select">

      <el-tabs class="demo-tabs" style="height: 100%" tab-position="top" type="border-card">
        <DraggableDivider :target-element-id="'right'" direction="left"></DraggableDivider>

        <el-tab-pane :label="$t('app.components')">

          <el-collapse accordion v-model="BoxActiveName" style="border: none;padding: 0px 8px">
            <el-collapse-item :title="$t('app.system_components')" name="1">
              <el-row>
                <el-col v-for="(item, index) in BoxComponentNames['system']" :span="24" style="margin-bottom: 8px">
                  <t-button theme="default" class="full-width-button" draggable="true"

                            style="width: 100%;"
                            @dragstart="拖拽开始($event, item,'el')"
                  >
                    {{ $te('componentName.' + item) ? $t('componentName.' + item) : item }}
                  </t-button>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item :title="$t('app.td_components')" name="2">
              <el-row>
                <el-col v-for="(item, index) in BoxComponentNames['tdesign']" :span="24" style="margin-bottom: 8px">
                  <t-button theme="default" class="full-width-button" draggable="true"
                            style="width: 100%;"
                            @dragstart="拖拽开始($event, item,'td')"
                  >
                    {{ $te('componentName.' + item) ? $t('componentName.' + item) : item }}
                  </t-button>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item :title="$t('app.Custom')" name="3">
              <el-row>
                <el-col v-for="(item, index) in 自定义组件名称列表" :span="24" style="margin-bottom: 8px">
                  <t-button theme="default" class="full-width-button" draggable="true"
                            style="width: 100%;"
                            @dragstart="拖拽开始_自定义组件($event, item,'el')"
                  >
                    {{
                      $te('componentName.' + item.componentName) ? $t('componentName.' + item.componentName) : item.componentName
                    }}

                  </t-button>
                </el-col>
              </el-row>
            </el-collapse-item>


          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="footer" class="调试信息" style="position: relative;min-height: 200px">
      <DraggableDivider :target-element-id="'footer'" direction="top"></DraggableDivider>

      <el-tabs v-model="store.选择夹_底部现行选中项" class="demo-tabs" style="height: 100%" tab-position="top"
               type="border-card">

        <el-tab-pane :label="$t('app.help_info')">
          <p v-if="!store.客户端模式" v-html="$t('app.helpDesc')">
          </p>
          <div ref="scrollContainer" style="height: 100px;overflow-y: auto"
               v-html="store.帮助信息"
          ></div>
        </el-tab-pane>
        <el-tab-pane :label="$t('app.debug_info')">
          <div ref="scrollContainer" style="height: 100px;overflow-y: auto"
               v-html="store.调试信息"
          ></div>
        </el-tab-pane>
      </el-tabs>


    </div>
    <div v-if="!store.客户端模式" class="备案信息" style="    position: absolute;
    bottom: 0;
    left: 30%;">
      <el-text>黔ICP备19002063号-4 贵公网安备 52230102000312号</el-text>
    </div>
    <div class="标题 clear-select">
      <el-text size="large" style="">
        <el-icon>
          <Sunny/>
        </el-icon>
        {{ $t('app.name') }}
        <el-text size="small">{{ store.版本号 }}</el-text>
      </el-text>
    </div>
    <div class="工具条 clear-select">

      <el-row>
        <el-col :span="20">
          <t-dropdown :options="[
  {
    content: $t('app.new') ,
    value: 1,
    onClick: () => appAction.新建(),
  },
  {
    content: $t('app.open') ,
    value: 2,
    onClick: () => appAction.打开(),
  },
  {
    content: $t('app.save') ,
    value: 3,
    onClick: () => appAction.保存设计文件(),
  },
  {
    content: $t('app.environmentCheck') ,
    value: 4,
    onClick: () => appAction.运行环境检测(),
  },
  {
    content: $t('app.projectConfig') ,
    value: 5,
    onClick: () => store.显示项目配置对话框 = true,
  },
]" :min-column-width="112" >
            <t-button variant="text">
              {{  $t('app.File') }}
              <template #suffix>
                <chevron-down-icon size="16"/>
              </template>
            </t-button>
          </t-dropdown>

          <el-button-group class="">
            <t-button theme="default" :icon="Key" @click="appAction.运行()">{{ store.运行按钮文本 }}</t-button>
            <t-button theme="default" :icon="Key" @click="appAction.编译()">{{ store.编译按钮文本 }}</t-button>

            <t-button theme="default" v-if="store.客户端模式" :icon="Help" @click="appAction.检查更新()">{{
                $t('app.updateCheck')
              }}
            </t-button>
            <t-button theme="default" v-if="!store.客户端模式" :icon="Help" @click="appAction.下载客户端()">{{
                $t('app.downloadClient')
              }}
            </t-button>
            <t-button theme="default" :icon="Help" @click="appAction.帮助()">{{ $t('app.help') }}</t-button>


          </el-button-group>
        </el-col>
        <el-col :span="4">

          <el-dropdown style="
    position: absolute;
    right: 0;
">
            <el-button type="">
              <el-icon>
                <Switch/>
              </el-icon>
              {{ locale }}
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                    v-for="item in languages"
                    :key="item"
                    :class="{ 'is-active': item === locale }"
                    class="lang-item"
                    @click="onclickLanguageHandle(item)"
                >{{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>

      </el-row>

    </div>
  </div>
  <component is="项目配置对话框" v-model="store.显示项目配置对话框" @确定="store.显示项目配置对话框=false"
             @关闭="store.显示项目配置对话框=false"></component>


</template>

<script setup>
import {inject, nextTick, onMounted, ref, watch} from 'vue';
import {useAppStore} from '@/stores/appStore'
import {ElMessage} from "element-plus";
import {Help, Key, Switch} from "@element-plus/icons-vue";
import {appAction} from '@/action/app.js';

import {E取配置信息} from "../wailsjs/go/main/App";
import releases_latest from '../public/releases_latest.json'
import {useI18n} from "vue-i18n";
import DraggableDivider from "./components/designer/public/DraggableDivider.vue";
import {ChevronDownIcon} from "tdesign-icons-vue-next";
const {t, te, availableLocales: languages, locale} = useI18n();
//读取本地存储
if (localStorage.getItem("locale")) {
  locale.value = localStorage.getItem("locale");
} else {
  localStorage.setItem("locale", 'English');
}
const scrollContainer = ref(null);

const store = useAppStore()
store.init()

const onclickLanguageHandle = async (item) => {
  item !== locale.value ? (locale.value = item) : false;
  locale.value = item;
  //写入本地存储
  console.log("设置语言", item)
  localStorage.setItem("locale", item);
  store.运行按钮文本 = t("app.run");
  store.编译按钮文本 = t("app.compile");
  store.取组件列表()
  store.当前拖拽组件数据 = null
  await nextTick()
  store.当前拖拽组件数据 = store.组件通过id查找结构("1")
};


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

  if (!store.客户端模式) {
    版本信息(releases_latest)
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

// const tabLeftVal = ref('0');
// const tabRightVal = ref('0');
// const tabFooterVal = ref('0');
// const tabMainVal = ref(null)
const tabContentHight = ref(0);

async function ReSize() {
  try {
    await nextTick()
    let tabMainVal = document.getElementById("tabMainVal")
    let contentHeight = tabMainVal.clientHeight
    let headerHeight = document.querySelector('#tabMainVal > div > div > div.el-tabs__header.is-top').clientHeight
    console.log("headerHeight", headerHeight)
    console.log("contentHeight", contentHeight)
    tabContentHight.value = contentHeight - headerHeight
    // console.log("new contentHeight", tabContentHight.value)

    tabMainVal.querySelector('#designer').style.height = tabContentHight.value - 16 + 'px'
    document.querySelector('#tabLeftSuper').style.height = tabContentHight.value + 'px'
    document.querySelector('#tabLeftProject').style.height = tabContentHight.value + 'px'
    document.querySelector('#tabLeftAttrPane').style.height = tabContentHight.value + 'px'

    // document.querySelector('#left > div > div.el-tabs__content').style.height = tabContentHight.value - 16 + 'px'
    tabMainVal.querySelector('#codeEdit').style.height = tabContentHight.value - 16 + 'px'

  } catch (e) {

  }


}

const BoxActiveName = ref('1')
//记录 BoxActiveName 的变化写到本地存储
watch(BoxActiveName, function BoxActiveNameChange() {
  localStorage.setItem("BoxActiveName", BoxActiveName.value)
})


onMounted(async () => {
  store.scrollContainer = scrollContainer.value;
  appAction.init()
  appAction.新建()
  store.取组件列表()
  store.当前拖拽组件数据 = store.组件通过id查找结构("1")
  try {
    let res = await E取配置信息()
    res = JSON.parse(res)
    console.log("取配置信息", res)
    store.项目信息.IDE插件地址 = "http://127.0.0.1:" + res.IDE插件端口号
    store.项目信息.设计文件路径 = res.设计文件路径
    if (store.项目信息.设计文件路径 != "") {
      appAction._打开文件加载界面(store.项目信息.设计文件路径)
    }
    store.版本号 = res.Version

  } catch (e) {

  }
  console.log("store.当前组件索引", store.当前组件索引)
  document.addEventListener("keydown", handleKeyDown);

  setTimeout(() => {
    store.bodyLoaded = true

  }, 200)
  版本号自动检测()
  setTimeout(() => {
    ReSize()
  }, 1000)
  ReSize()

  window.addEventListener('resize', function () {
    console.log("重新计算高度")
    ReSize()
  })

  init_tailwindcss()
  // 恢复
  if (localStorage.getItem("BoxActiveName")) {
    BoxActiveName.value = localStorage.getItem("BoxActiveName")
  }
})

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

async function 拖拽开始_自定义组件(event, item, uiname) {
  let 组件名称 = item.componentName
  let 组件路径 = item.组件路径
  let 组件默认属性 = item.组件默认属性

  function 创建自定义组件json(组件名称, 组件html, 新属性) {
    let k = store.获取索引(组件名称)

    新属性.id = store.获取随机id()
    //避免名称重复导致后续代码出问题
    for (let i = 0; i < 100; i++) {
      let 名称是否存在 = store.递归查找名称(store.list, k)
      // console.log("名称是否存在", 名称是否存在)
      if (名称是否存在) {
        k = store.获取索引(组件名称)
      } else {
        break
      }
    }
    新属性.componentName = uiname + 'CustomComponent'
    新属性.自定义组件名称 = 组件名称
    新属性.name = k
    新属性.text = k
    新属性.HTML = 组件html
    store.当前拖拽组件数据 = 新属性
    // console.log("自定义组件创建=============", JSON.stringify(新属性))
  }

  try {
    const responseDefaultAttributes = await fetch(组件默认属性);
    const dataDefaultAttributes = await responseDefaultAttributes.text();
    const blob = new Blob([dataDefaultAttributes], {type: 'application/javascript'});
    const url = URL.createObjectURL(blob);
    const module = await import(url);
    const 新属性 = module.default;
    // console.log("自定义组件默认属性", 新属性);
    const responseHtml = await fetch(组件路径);
    const 组件html = await responseHtml.text();
    // console.log("自定义组件的html", 组件html);
    创建自定义组件json(组件名称, 组件html, 新属性);
  } catch (e) {
    //弹出饿了么的提示框
    console.error(e)
    ElMessage({
      message: "自定义组件加载失败",
      type: 'success',
      duration: 3000, // 设置显示时间为5秒，单位为毫秒
    });
  }


}

const BoxComponentDefaultValue = inject("BoxComponentDefaultValue")
const BoxComponentNames = inject("BoxComponentNames")

function 拖拽开始(event, 组件名称, uiName) {
  let 新属性 = ""
  try {
    新属性 = JSON.parse(JSON.stringify(BoxComponentDefaultValue[uiName][组件名称]))
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
  // newName 检查是否有中文翻译 如果有则使用翻译 没有则使用原来的
  let newName = te('componentName.' + 组件名称) ? t('componentName.' + 组件名称) : 组件名称;
  let k = store.获取索引(newName)
  新属性.id = store.获取随机id()
  新属性.componentName = 组件名称
  新属性.componentRawName = 组件名称
  新属性.name = k
  if (新属性.hasOwnProperty("text")) {
    新属性.text = k
  }
  if (新属性.hasOwnProperty("text")) {
    新属性.text = k
  }
  if (新属性.hasOwnProperty("内容")) {
    新属性.text = k
  }
  //把ui加上前缀比如 el
  新属性.componentName = uiName + 组件名称

  console.log("当前组件名称", 组件名称)

  if (组件名称 == "elContainer") {
    新属性.border = "1px solid black"
  }
  // if (组件名称 == "Tabs") {
  //   let id = 新属性.id
  //   for (var i = 0; i < 新属性.子组件.length; i++) {
  //     新属性.子组件[i].id = store.获取随机id()
  //     新属性.子组件[i].名称 = store.获取索引(新属性.子组件[i].名称)
  //     新属性.子组件[i].text= store.获取索引(新属性.子组件[i].标题)
  //     新属性.子组件[i].pid = id
  //   }
  // }

  if (组件名称 == "FlexLayout" || 组件名称 == "CommonLayout" || 组件名称 == "Tabs") {
    let id = 新属性.id
    for (var i = 0; i < 新属性.childComponents.length; i++) {
      新属性.childComponents[i].id = store.获取随机id()
      新属性.childComponents[i].name = store.获取索引(新属性.childComponents[i].name)
      新属性.childComponents[i].pid = id
      //检查 新属性.子组件[i].text是否存在 如果存在 则修改
      if (新属性.childComponents[i].hasOwnProperty("text")) {
        新属性.childComponents[i].text = store.获取索引(新属性.childComponents[i].text)
      }
    }

  }

  store.当前拖拽组件数据 = 新属性
}

let 复制组件 = []

function handleKeyDown(event) {
  // 如果按下的是Cmd + S（Mac）或Ctrl + S（Windows/Linux）
  console.log("按下某键盘", event.key)


  if (event.key === "Delete") {
    event.preventDefault(); // 阻止浏览器默认保存行为
    // 在这里执行你想要的操作，比如保存数据或触发特定的方法
    console.log("按下了删除 Delete", store.当前拖拽组件数据);

    store.递归删除id(store.list, store.当前多选组件ID)
    // store.递归删除id(store.list, store.当前组件索引)


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
      appAction.保存设计文件()
      ElMessage({
        message: '已保存',
        type: 'success',
        duration: 3000, // 设置显示时间为5秒，单位为毫秒
      });
    }
  }
}

function 组件树选中(data) {
  store.当前拖拽组件数据 = store.组件通过id查找结构(data.id)
  console.log('组件树选中', store.当前拖拽组件数据)
  store.当前组件索引 = store.当前拖拽组件数据.id
}

store.rightClickMenus = {
  menus: [
    {
      label: "等宽",
      click: () => {
        console.log("等宽", store.当前多选组件ID)
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          item.width = store.当前拖拽组件数据.width
        })
      }
    },
    {
      label: "等高",
      click: () => {
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          item.height = store.当前拖拽组件数据.height
        })
      }
    },
    {
      label: "等宽高",
      click: () => {
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          item.width = store.当前拖拽组件数据.width
          item.height = store.当前拖拽组件数据.height
        })
      }
    },
    {
      label: "左对齐",
      click: () => {
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          item.left = store.当前拖拽组件数据.left
        })
      }
    },
    {
      label: "右对齐",
      click: () => {
        let left = parseInt(store.当前拖拽组件数据.left)
        let width = parseInt(store.当前拖拽组件数据.width)
        let right = left + width
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          let value = right - item.width
          item.left = value
        })


      }
    },
    {
      label: "顶对齐",
      click: () => {
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          item.top = store.当前拖拽组件数据.top
        })
      }
    },
    {
      label: "底对齐",
      click: () => {
        let top = parseInt(store.当前拖拽组件数据.top)
        let height = parseInt(store.当前拖拽组件数据.height)
        let bottom = top + height
        store.当前多选组件ID.forEach(id => {
          let item = store.组件通过id查找结构(id)
          let value = bottom - item.height
          item.top = value
        })
      }
    },
    {
      label: "水平两端平均分布",
      click: () => {
        const sortedComponents = store.当前多选组件ID
            .map(id => ({id, left: store.组件通过id查找结构(id).left, width: store.组件通过id查找结构(id).width}))
            .sort((a, b) => a.left - b.left);
        const firstComponent = sortedComponents[0];
        const lastComponent = sortedComponents[sortedComponents.length - 1];
        const maxLeft = parseInt(lastComponent.left);
        const minLeft = parseInt(firstComponent.left);
        const leftSide = (maxLeft - minLeft) / (store.当前多选组件ID.length - 1)
        sortedComponents.forEach((component, index) => {
          let item = store.组件通过id查找结构(component.id);
          const newPosition = minLeft + index * leftSide;
          console.log("newPosition", newPosition);
          item.left = newPosition;
        });
      }
    },
    {
      label: "垂直两端平均分布",
      click: () => {
        const sortedComponents = store.当前多选组件ID
            .map(id => ({id, top: store.组件通过id查找结构(id).top, height: store.组件通过id查找结构(id).height}))
            .sort((a, b) => a.top - b.top);

        const firstComponent = sortedComponents[0];
        const lastComponent = sortedComponents[sortedComponents.length - 1];
        const maxTop = parseInt(lastComponent.top);
        const minTop = parseInt(firstComponent.top);
        const topSide = (maxTop - minTop) / (store.当前多选组件ID.length - 1);

        sortedComponents.forEach((component, index) => {
          let item = store.组件通过id查找结构(component.id);
          const newPosition = minTop + index * topSide;
          console.log("newPosition", newPosition);
          item.top = newPosition;
        });


      }
    },
  ]
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