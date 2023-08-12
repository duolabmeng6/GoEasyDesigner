<template>
  <div class="container">
    <div class="工具条">
      <el-row>
        <el-col :span="12"><div class="grid-content ep-bg-purple" />
        <h2>窗口设计器</h2>
        </el-col>
        <el-col :span="12"><div class="grid-content ep-bg-purple-light" />
            <el-button @click="加载界面">加载界面</el-button>
            <el-button @click="保存界面">保存界面</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="属性表格">

      <table v-if="当前组件索引>=0">
        <tr>
          <th>顶边</th>
          <td><el-input v-model="组件列表[当前组件索引].style.top"/></td>
        </tr>
        <tr>
          <th>左边</th>
          <td><el-input v-model="组件列表[当前组件索引].style.left"/></td>
        </tr>
        <tr>
          <th>宽度</th>
          <td><el-input v-model="组件列表[当前组件索引].style.width"/></td>
        </tr>
        <tr>
          <th>高度</th>
          <td><el-input v-model="组件列表[当前组件索引].style.height"/></td>
        </tr>
        <tr>
          <th>标题</th>
          <td><el-input v-model="组件列表[当前组件索引].标题"/></td>
        </tr>
        <tr>
          <th>点击事件</th>
          <td><el-input v-model="组件列表[当前组件索引].点击事件" type="textarea" /></td>
        </tr>
      </table>
    </div>
    <div class="画布">
      <div class="huabu"
           @mousedown="画布鼠标按下"
           @mousemove="画布鼠标移动"
           @mouseup="画布鼠标放开"
           @dragover.prevent @drop="画布拖放完成"
      >

        <Shape
            v-for="(item, index) in 组件列表"
            :style="getStyle(item.style)"
            @update-style="updateStyle"
            :index="index"
            :nowIndex="当前组件索引"
        >
          <component class="test"
                     :is="item.组件名称"
                     :style="getStyle(item.style)"
                     :属性="组件列表[index]"
                     @mousedown="组件鼠标按下($event, index)"
                     @mousemove="组件鼠标移动($event, index)"
                     @mouseup="组件鼠标放开($event, index)"
                     data-index="index"
          />

        </Shape>

      </div>
    </div>
    <div class="控件箱">

      <div  v-for="(item, index) in 组件名称列表"
            draggable="true"
            @dragstart="组件开始拖动($event, item)"
      >
        <el-button

        >
          {{ item }}
        </el-button>
      </div>

    </div>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue'

import Shape from '@/components/Shape.vue'

onMounted(() => {
})


const objInfo = ref({
  标题: '标题',
  style: {
    left: 20,
    top: 20,
    width: 100,
    height: 100
  }
})
const 组件列表 = ref([
  // {
  //   id: 1,
  //   组件名称: "按钮",
  //   标题: '标题1',
  //   style: {
  //     left: 20,
  //     top: 20,
  //     width: 100,
  //     height: 100
  //   }
  // },
  // {
  //   id: 2,
  //   标题: '标题2',
  //   style: {
  //     left: 40,
  //     top: 40,
  //     width: 100,
  //     height: 100
  //   }
  // }
])

let 组件拖动状态 = false
let 当前组件索引 = ref(-1)
let 组件偏移X = 0
let 组件偏移Y = 0
let 组件索引id = 0

function 创建组件(组件名称, left, top, width, height) {
  组件索引id = 组件索引id + 1
  组件列表.value.push({
    id: 组件索引id,
    组件名称: 组件名称,
    标题: 组件名称 + 组件索引id,
    style: {
      left: left,
      top: top,
      width: width,
      height: height
    },
    点击事件: "action.E" + 组件名称 + 组件索引id + "被点击().then(result => {console.log(result)})"
  })
}

function getStyle(style) {
  // console.log(style)
  const result = {}
  result['width'] = style['width'] + "px"
  result['height'] = style['height'] + "px"
  result['top'] = style['top'] + "px"
  result['left'] = style['left'] + "px"
  return result
}

function updateStyle(index, newStyle) {
  组件列表.value[index].style = {...组件列表.value[index].style, ...newStyle};

}

function 组件鼠标按下(event, index) {
  //禁止冒泡
  event.stopPropagation();

  //console.log("组件鼠标按下",index)
  组件拖动状态 = true
  当前组件索引.value = index
  组件偏移X = event.clientX - 组件列表.value[index].style.left
  组件偏移Y = event.clientY - 组件列表.value[index].style.top
}

function 组件鼠标移动(event, index) {
  // console.log("组件鼠标移动",index)
  if (当前组件索引.value == -1) {
    return
  }

  if (组件拖动状态) {
    组件列表.value[当前组件索引.value].style.left = event.clientX - 组件偏移X
    组件列表.value[当前组件索引.value].style.top = event.clientY - 组件偏移Y
  }
}

function 组件鼠标放开(event, index) {
  //console.log("组件鼠标放开",index)
  组件拖动状态 = false
}

function 画布鼠标按下(event) {
  console.log("画布鼠标按下")
  当前组件索引.value = -1

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
      组件列表.value = obj
    }
  }
  input.click()
}

function 保存界面() {
  let json = JSON.stringify(组件列表.value, null, 2)
  console.log(json)
  const blob = new Blob([json], {type: 'application/json'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '组件列表.json'
  link.click()
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
  width: 500px;
  height: 500px;
  position: relative;
  overflow: hidden;
}


.test {
//border: black 1px solid; //position: absolute;
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