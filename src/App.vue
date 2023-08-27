<template>
  <div class="container">
    <div class="工具条">
      <el-row>
        <el-col :span="12">
          <div class="grid-content ep-bg-purple"/>
          <h2>窗口设计器</h2>
        </el-col>
        <el-col :span="12">
          <div class="grid-content ep-bg-purple-light"/>
          <el-button @click="加载界面">加载界面</el-button>
          <el-button @click="保存界面">保存界面</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="属性表格">
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

      <component :is="store.当前组件名称()"></component>
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

const store = useCounterStore()

onMounted(() => {
  console.log("store.当前组件索引", store.当前组件索引)
})


let 组件拖动状态 = false
let 组件偏移X = 0
let 组件偏移Y = 0
let 组件索引id = 0

function 创建组件(组件名称, left, top, width, height) {
  组件索引id = 组件索引id + 1
  var d = {}
  if (组件名称 == '按钮') {
    d = 创建按钮(组件名称 + 组件索引id, left, top, width, height)
  }
  if (组件名称 == '编辑框') {
    d = 创建编辑框(组件名称 + 组件索引id, left, top, width, height)
  }
  if (组件名称 == '标签') {
    d = 创建标签(组件名称 + 组件索引id, left, top, width, height)
  }
  if (组件名称 == '开关') {
    d = 创建开关(组件名称 + 组件索引id, left, top, width, height)
  }
  if (组件名称 == '多选框') {
    d = 创建多选框(组件名称 + 组件索引id, left, top, width, height)
  }

  d.id = 组件索引id
  d.可视 = true
  console.log("创建组件", d)
  store.组件列表.push(d)

}

function getStyle(style) {
  console.log(style)
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
      const json = reader.result
      console.log(json)
      const obj = JSON.parse(json)
      console.log(obj)
      store.组件列表 = obj
    }
  }
  input.click()
}

function 保存界面() {
  let njson = {
    窗口: {
      宽度: store.画布属性.宽度,
      高度: store.画布属性.高度,
      左边: store.画布属性.左边,
      顶边: store.画布属性.顶边,
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

.test *{
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