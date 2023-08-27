<template>
  <div class="container">
    <div class="工具条">
      <div style="margin: 10px">

        <el-row>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple"/>
            <h2>窗口设计器</h2>
          </el-col>
          <el-col :span="12">
            <div class="grid-content ep-bg-purple-light"/>

            <el-button v-if="!store.客户端模式" @click="加载界面">加载界面</el-button>
            <el-button v-if="!store.客户端模式" @click="保存界面">保存界面</el-button>
            <el-button v-if="store.客户端模式" @click="打开">打开</el-button>
            <el-button v-if="store.客户端模式" @click="保存">保存</el-button>
            <el-button v-if="store.客户端模式" @click="项目配置">项目配置</el-button>


          </el-col>
        </el-row>
      </div>
    </div>
    <div class="属性表格">
      <div style="margin-left: 20px;margin-right: 20px ">
        <el-select v-model="store.当前组件索引" :dd="store.当前组件索引" class="m-2" placeholder="Select" size="large">
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
        <div style="padding-top: 20px;"></div>
        <component :is="store.当前组件名称()" @添加事件被选择="添加事件被选择"></component>
      </div>
    </div>
    <div class="画布">
      <div class="huabu" :style="store.取窗口样式()"
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
        >
          <component class="test"
                     :is="item.组件名称"
                     :style="getStyle(item)"
                     :属性="store.组件列表[index]"
                     @mousedown="组件鼠标按下($event, index)"
                     @mousemove="组件鼠标移动($event, index)"
                     @mouseup="组件鼠标放开($event, index)"
                     @keydown="键盘按下($event, index)"
                     @dblclick="组件被双击($event, index)"

                     data-index="index"
          />

        </Shape>

      </div>
    </div>
    <div class="控件箱">


      <el-menu
          class="el-menu-vertical-demo"
          :default-openeds="['1', '2']"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>基本组件</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item, index) in 组件名称列表"
                          draggable="true"
                          @dragstart="组件开始拖动($event, item)"
            >
              {{ item }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>数据展示</span>
          </template>
          <el-menu-item-group>

          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>


    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="项目配置"
      width="50%"
  >
    <el-form label-position="top"
             label-width="200px">
      <el-form-item label="设计文件路径">
        <el-input v-model="store.项目信息.设计文件路径"/>
      </el-form-item>
      <el-form-item label="窗口事件文件路径">
        <el-input v-model="store.项目信息.窗口事件文件路径"/>
      </el-form-item>
      <el-form-item label="IDE插件地址">
        <el-input v-model="store.项目信息.IDE插件地址"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="确定项目配置">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import Shape from '@/components/Shape.vue'
import {useCounterStore} from '@/stores/counter'
import {创建按钮} from '@/components/创建组件属性/创建按钮'
import {创建编辑框} from '@/components/创建组件属性/创建编辑框'
import {创建标签} from '@/components/创建组件属性/创建标签'
import {创建开关} from '@/components/创建组件属性/创建开关'
import {创建多选框} from '@/components/创建组件属性/创建多选框'
import {E保存, E创建函数, E打开文件对话框, E读入文件} from "../wailsjs/go/main/App";
import {WindowSetSize} from "../wailsjs/runtime";
import {ElMessage} from "element-plus"; // 根据实际文件路径进行修改

const store = useCounterStore()
const dialogVisible = ref(false);

function 项目配置() {
  dialogVisible.value = true;
  console.log("项目配置")
}

const 确定项目配置 = () => {
  console.log("确定")
  //弹出提示已保存
  ElMessage({
    message: '保存成功',
    type: 'success',
    duration: 3000, // 设置显示时间为5秒，单位为毫秒
  });
  dialogVisible.value = false;

}

onMounted(() => {
  console.log("store.当前组件索引", store.当前组件索引)


  try {
    WindowSetSize(1280 + 13, 720 + 35)
    store.客户端模式 = true
  } catch (e) {
    store.客户端模式 = false
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

}

function 组件开始拖动(event, text) {
  event.dataTransfer.setData('text/plain', text);
}

function 画布拖放完成(event) {
  console.log("画布拖放完成")
  const droppedText = event.dataTransfer.getData('text/plain');
  console.log('拖放的文本内容:', droppedText);
  //获取鼠标的位置 要相对于画布的位置
  const 鼠标的位置X = event.clientX - event.target.offsetLeft
  const 鼠标的位置Y = event.clientY - event.target.offsetTop


  console.log(鼠标的位置X, 鼠标的位置Y)
  if (droppedText == '按钮') {
  }
  if (droppedText == '编辑框') {
  }
  if (droppedText == '标签') {
  }

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
  link.download = '组件数据.json'
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

  E保存(store.项目信息.设计文件路径, json).then((res) => {
    console.log(res)

    ElMessage({
      message: res,
      type: 'success',
      duration: 3000, // 设置显示时间为5秒，单位为毫秒
    });
  })
}

function 打开() {
  console.log("打开")
  E打开文件对话框().then((res) => {
    if (res == "") {
      return
    }
    store.项目信息.设计文件路径 = res
    //取父目录 加上 窗口事件.js
    let res2 = res.split("\\")
    res2.pop()
    res2.push("窗口事件.js")
    let res3 = res2.join("\\")
    store.项目信息.窗口事件文件路径 = res3
    console.log("设计文件路径", store.项目信息.设计文件路径)
    console.log("窗口事件文件路径", store.项目信息.窗口事件文件路径)
    E读入文件(store.项目信息.设计文件路径).then((res) => {
      console.log(res)
      初始化界面数据(res)

    })
  })
}


</script>

<style>

* {
  margin: 0;
  padding: 0;
  user-select: none;

}


.huabu {
  background: rgb(240, 240, 240);
  position: relative;
  overflow: hidden;
}


.test {
//border: black 1px solid; //position: absolute;
}

.test * {
  pointer-events: none;

}

.container {
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.5fr;
  grid-template-rows: 0.2fr 1.8fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "工具条 工具条 工具条"
    "属性表格 画布 控件箱"
    "属性表格 画布 控件箱";
}

.工具条 {
  grid-area: 工具条;
}

.属性表格 {
  grid-area: 属性表格;
  width: 260px;

}

.画布 {
  grid-area: 画布;
}

.控件箱 {
  grid-area: 控件箱;
}


</style>