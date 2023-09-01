<template>
  <div class="container">
    <div class="头部 "></div>
    <div class="属性框 clear-select">
      <el-tabs type="border-card" style="height: 100%">
        <el-tab-pane label="属性" style="height: 100%;">
          <div class="container2">
            <div class="组件列表">
              <el-select v-model="store.当前组件索引" :dd="store.当前组件索引" class="m-2" placeholder="Select"
                         size="large" style="width: 100%">
                <el-option
                    key="-1"
                    label="窗口"
                    value="-1"
                />
                <el-option
                    v-for="(item, index) in store.组件列表"
                    :key="index"
                    :label="item.名称"
                    :value="index"
                />
              </el-select>
            </div>
            <component :is="store.当前组件名称()" @添加事件被选择="添加事件被选择"></component>
          </div>
        </el-tab-pane>
        <el-tab-pane label="支持库">支持库</el-tab-pane>
        <el-tab-pane label="项目管理">项目管理</el-tab-pane>
      </el-tabs>
    </div>
    <div class="设计区域">
      <el-col :span="24" style="height: 100%">
        <el-tabs type="border-card" tab-position="top" style="height: 100%">
          <el-tab-pane label="界面设计">
            <Shape
                :style="store.取窗口样式()"
                @update-style="updateStyle2"
                style="position: relative;"
                :index=-1
                :nowIndex="store.当前组件索引"
            >
              <div class="画布" :style="store.取窗口样式()"
                   @mousedown="画布鼠标按下"
                   @mousemove="画布鼠标移动"
                   @mouseup="组件鼠标放开"
                   @dragover.prevent @drop="画布拖放完成"
              >

                <Shape
                    v-for="(item, index) in store.组件列表"
                    :style="getStyle(item)"
                    @update-style="updateStyle"
                    :index="index"
                    :nowIndex="store.当前组件索引"
                    @keydown="键盘按下($event, index)"
                >
                  <component class="绘制的组件"
                             :is="item.组件名称"
                             :style="getStyle(item)"
                             :属性="store.组件列表[index]"
                             @mousedown="组件鼠标按下($event, index)"
                             @mousemove="组件鼠标移动($event, index)"
                             @mouseup="组件鼠标放开($event, index)"
                             @dblclick="组件被双击($event, index)"

                             data-index="index"
                  />

                </Shape>

              </div>
            </Shape>
          </el-tab-pane>
          <el-tab-pane label="编辑代码">

            <component is="代码编辑器" v-model:value="code"
                       height="400px"
                       width="720px"
            />

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
    <div class="工具箱 clear-select">
      <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="组件">
          <el-collapse model-value="1" @change="handleChange" accordion style="border: none">
            <el-collapse-item title="系统组件" name="1">
              <el-row>
                <el-col :span="24" style="margin-bottom: 8px" v-for="(item, index) in 组件名称列表">
                  <el-button class="full-width-button" style="width: 100%;"
                             draggable="true"
                             @dragstart="组件开始拖动($event, item)"
                  >
                    {{ item }}
                  </el-button>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="数据展示组件" name="2">

            </el-collapse-item>
            <el-collapse-item title="自定义组件" name="3">

            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="调试信息">
      <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="帮助信息">帮助信息</el-tab-pane>
        <el-tab-pane label="调试信息">调试信息</el-tab-pane>
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
      <el-button-group class="ml-4">
        <template v-if="!store.客户端模式">
          <el-button :icon="Edit" @click="加载界面">加载界面</el-button>
          <el-button :icon="Edit" @click="保存界面">保存界面</el-button>
        </template>
        <template v-if="store.客户端模式">
          <el-button :icon="Edit" @click="打开">打开</el-button>
          <el-button :icon="Edit" @click="保存">保存</el-button>
          <el-button :icon="Edit" @click="运行">运行</el-button>
          <el-button :icon="Edit" @click="编译">编译</el-button>
        </template>
        <el-button :icon="Edit" @click="项目配置">项目配置</el-button>
      </el-button-group>
    </div>
  </div>
  <component is="项目配置对话框" v-model="显示项目配置对话框" @确定="显示项目配置对话框=false"
             @关闭="显示项目配置对话框=false"></component>
</template>


<style>
</style>
<script setup>
import {Edit} from "@element-plus/icons-vue";
import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import Shape from '@/components/Shape.vue'
import {useCounterStore} from '@/stores/counter'
import {创建按钮} from '@/components/创建组件属性/创建按钮'
import {创建编辑框} from '@/components/创建组件属性/创建编辑框'
import {创建标签} from '@/components/创建组件属性/创建标签'
import {创建开关} from '@/components/创建组件属性/创建开关'
import {创建多选框} from '@/components/创建组件属性/创建多选框'
import {E保存, E创建函数, E打开文件对话框, E读入文件, E保存件对话框} from "../wailsjs/go/main/App";
import {WindowSetSize} from "../wailsjs/runtime";
import {ElMessage} from "element-plus";
import 项目配置对话框 from "@/components/设计器组件/项目配置对话框.vue"; // 根据实际文件路径进行修改

const store = useCounterStore()
const 显示项目配置对话框 = ref(false);
const code = ref('function hello() {\n\talert("Hello world!");\n}')

function 项目配置() {
  显示项目配置对话框.value = true;
  console.log("项目配置")
}
function handleKeyDown(event) {
  // 如果按下的是Cmd + S（Mac）或Ctrl + S（Windows/Linux）
  console.log("按下某键盘", event.key)
  键盘按下(event, store.当前组件索引)
  if ((event.metaKey || event.ctrlKey) && event.key === "s") {
    event.preventDefault(); // 阻止浏览器默认保存行为
    // 在这里执行你想要的操作，比如保存数据或触发特定的方法
    console.log("按下了保存 Cmd/Ctrl + S");

    console.log(code.value)
    if(store.项目信息.窗口事件文件路径 != ""){
      E保存(store.项目信息.窗口事件文件路径, code.value).then((res) => {
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

onMounted(() => {
  console.log("store.当前组件索引", store.当前组件索引)
  document.addEventListener("keydown", handleKeyDown);

  try {
    WindowSetSize(1280 + 13, 720 + 35)
    store.客户端模式 = true
  } catch (e) {
    store.客户端模式 = false
  }

})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose();
  }
})

let 组件拖动状态 = false
let 组件偏移X = 0
let 组件偏移Y = 0
let 组件索引id = 0

const indexMap = {};

function 获取索引(名称) {
  if (!indexMap[名称]) {
    indexMap[名称] = 1; // 如果还没有该名称的索引，初始化为1
  } else {
    indexMap[名称]++; // 如果已经有了该名称的索引，递增
  }

  return indexMap[名称];
}

function 创建组件(组件名称, left, top, width, height) {
  组件索引id = 获取索引(组件名称)
  var d = {}
  if (组件名称 == '按钮') {
    d = 创建按钮(组件名称 + 组件索引id, left, top, 120, 38)
  }
  if (组件名称 == '编辑框') {
    d = 创建编辑框(组件名称 + 组件索引id, left, top, 120, 32)
  }
  if (组件名称 == '标签') {
    d = 创建标签(组件名称 + 组件索引id, left, top, 60, 32)
  }
  if (组件名称 == '开关') {
    d = 创建开关(组件名称 + 组件索引id, left, top, 60, 40)
  }
  if (组件名称 == '多选框') {
    d = 创建多选框(组件名称 + 组件索引id, left, top, 80, 35)
  }

  d.id = 组件索引id
  d.可视 = true
  console.log("创建组件", d)
  store.组件列表.push(d)

}

function getStyle(style) {
  // console.log("getStyle", style)
  let s = style['style']
  const result = {}
  result['width'] = s['width'] + "px"
  result['height'] = s['height'] + "px"
  result['top'] = s['top'] + "px"
  result['left'] = s['left'] + "px"
  result['display'] = style['可视'] ? 'block' : 'none'

  return result
}

function updateStyle(index, newStyle) {
  store.组件列表[index].style = {...store.组件列表[index].style, ...newStyle};
}

function updateStyle2(index, newStyle) {
  store.画布属性 = {...store.画布属性, ...newStyle};
}

function 组件鼠标按下(event, index) {
  //禁止冒泡
  event.stopPropagation();

  //console.log("组件鼠标按下",index)
  组件拖动状态 = true
  store.当前组件索引 = parseInt(index)
  组件偏移X = event.clientX - store.组件列表[index].style.left
  组件偏移Y = event.clientY - store.组件列表[index].style.top
}

function 组件鼠标移动(event, index) {
  // console.log("组件鼠标移动",index)
  if (store.当前组件索引 == -1) {
    return
  }

  if (组件拖动状态) {
    store.组件列表[store.当前组件索引].style.left = event.clientX - 组件偏移X
    store.组件列表[store.当前组件索引].style.top = event.clientY - 组件偏移Y
  }
}

function 组件鼠标放开(event, index) {
  //console.log("组件鼠标放开",index)
  组件拖动状态 = false
}

function 组件被双击(event, index) {
  console.log("组件被双击", index)
  store.当前组件索引 = parseInt(index)
  添加事件被选择("被单击")
}

function 画布鼠标按下(event) {
  console.log("画布鼠标按下")
  store.当前组件索引 = "-1"
  console.log("画布鼠标按下", store.当前组件索引)

}

function 组件开始拖动(event, text) {
  event.dataTransfer.setData('text/plain', text);
}

function 画布鼠标移动(event) {


}

function 画布拖放完成(event) {
  const droppedText = event.dataTransfer.getData('text/plain');
  console.log('拖放的文本内容:', droppedText);
  //获取鼠标的位置 要相对于画布的位置
  const 鼠标的位置X = event.clientX - parseInt(event.target.getBoundingClientRect().left)
  const 鼠标的位置Y = event.clientY - parseInt(event.target.getBoundingClientRect().top)
  console.log("画布拖放完成", 鼠标的位置X, 鼠标的位置Y)

  创建组件(droppedText, 鼠标的位置X, 鼠标的位置Y, 120, 48)
}

function 初始化界面数据(data) {
  const obj = JSON.parse(data)
  store.画布属性.width = obj.窗口.宽度
  store.画布属性.height = obj.窗口.高度
  store.画布属性.left = obj.窗口.左边
  store.画布属性.top = obj.窗口.顶边
  store.画布属性.标题 = obj.窗口.标题
  store.画布属性.可视 = obj.窗口.可视
  console.log(obj)
  //删除窗口属性
  let 组件列表 = []
  for (var key in obj) {
    if (key == "窗口") {
      continue
    }
    组件列表.push(obj[key])
    获取索引(obj[key].组件名称)
  }

  store.组件列表 = 组件列表
}

function 加载界面() {
//打开文件对话框 加载.js后缀的文件
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      const data = reader.result
      console.log(data)
      初始化界面数据(data)
    }
  }
  input.click()
}

function 保存界面() {
  let njson = {
    窗口: {
      宽度: store.画布属性.width,
      高度: store.画布属性.height,
      左边: store.画布属性.left,
      顶边: store.画布属性.top,
      标题: store.画布属性.标题,
      可视: store.画布属性.可视,
    }
  }
  //循环 store.组件列表 加入 njson 中 使用 名称 作为key
  for (let i = 0; i < store.组件列表.length; i++) {
    let item = store.组件列表[i]
    njson[item.名称] = item
  }

  let json = JSON.stringify(njson, null, 2)
  console.log(json)
  const blob = new Blob([json], {type: 'application/json'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '设计文件.json'
  link.click()
}

function 键盘按下(event, index) {
  console.log("键盘按下", event.key, index)
  if (event.key == 'Delete') {
    store.当前组件索引 = -1
    store.组件列表.splice(index, 1)
  }
}

function 当前组件名称() {
  return "按钮属性"
}

function 添加事件被选择(事件名称) {
  if (事件名称 == "在此处选择加入事件处理函数") {
    return
  }
  if (store.当前组件索引 == -1) {
    return
  }

  console.log("添加事件被选择", 事件名称)
  let n = store.组件列表[store.当前组件索引].名称
  console.log("添加事件被选择", n + "_" + 事件名称)
  let code = "store.组件列表[store.当前组件索引].事件" + 事件名称 + "=" + '"' + n + "_" + 事件名称 + '"'
  console.log(code)
  eval(code)
  let ncode = `
    窗口.{事件名称} = function () {
        console.log("{事件名称}")
    }
`;
  // 替换 {事件名称} 为 事件名称
  ncode = ncode.replace(/{事件名称}/g, n + "_" + 事件名称)
  console.log(ncode)

  console.log(store.项目信息.窗口事件文件路径)
  E创建函数(store.项目信息.窗口事件文件路径, ncode, store.项目信息.IDE插件地址).then(
      (res) => {
        console.log(res)
      }
  )

  //这里需要编写一个插入代码的函数
  保存()
}


function 保存() {
  console.log("保存", store.项目信息.设计文件路径)
  let njson = {
    窗口: {
      宽度: store.画布属性.width,
      高度: store.画布属性.height,
      左边: store.画布属性.left,
      顶边: store.画布属性.top,
      标题: store.画布属性.标题,
      可视: store.画布属性.可视,
    }
  }
//循环 store.组件列表 加入 njson 中 使用 名称 作为key
  for (let i = 0; i < store.组件列表.length; i++) {
    let item = store.组件列表[i]
    njson[item.名称] = item
  }

  let json = JSON.stringify(njson, null, 2)

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
      console.log("窗口事件文件路径", store.项目信息.窗口事件文件路径)

      E保存(store.项目信息.设计文件路径, json).then((res) => {
        console.log(res)
        ElMessage({
          message: res,
          type: 'success',
          duration: 3000, // 设置显示时间为5秒，单位为毫秒
        });
      })
    })
    return
  }
  E保存(store.项目信息.设计文件路径, json).then((res) => {
    console.log(res)

    ElMessage({
      message: res,
      type: 'success',
      duration: 3000, // 设置显示时间为5秒，单位为毫秒
    });
  })


}

function 取父目录(path) {
  // 将所有的反斜杠 \ 替换为斜杠 /
  var convertedPath = path.replace(/\\/g, '/');

  // 使用正则表达式获取父目录
  var parentDirectory = convertedPath.replace(/\/[^/]*$/, '');

  return parentDirectory;
}

function 打开() {
  console.log("打开")
  E打开文件对话框().then((res) => {
    if (res == "") {
      return
    }
    store.项目信息.设计文件路径 = res
    store.项目信息.窗口事件文件路径 = 取父目录(res) + "/窗口事件.js"
    console.log("设计文件路径", store.项目信息.设计文件路径)
    console.log("窗口事件文件路径", store.项目信息.窗口事件文件路径)
    E读入文件(store.项目信息.设计文件路径).then((res) => {
      console.log(res)
      初始化界面数据(res)
    })
    E读入文件(store.项目信息.窗口事件文件路径).then((res) => {
      console.log(res)
      code.value = res
    })

  })
}

</script>

