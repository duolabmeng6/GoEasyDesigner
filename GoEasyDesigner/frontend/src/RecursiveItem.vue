<template>
  <Shape2
      :style="getItemStyle(item)"
      @update-style="updateStyle"
      :index="item.名称"
      :item_data="item"
      :nowIndex="store.当前组件索引"
  >
    <div class="子组件"
         data-放置="1"
         @dragstart.stop="拖拽开始($event,item)"
         @dragover.prevent="拖拽进入($event,item)"
         @dragleave.prevent="拖拽离开($event,item)"
         @drop.stop="拖拽放下($event,item)"
         draggable="true"
         @click.stop="鼠标按下($event,item)"

    >
      <template v-if="item.组件名称=='按钮'">
        <el-button :style="getItemStyle2(item)">{{ item.名称 }}</el-button>
      </template>
      <template v-else-if="item.组件名称=='布局容器'">
      </template>
      <template v-else>
      </template>
      <RecursiveItem v-for="(subItem, subIndex) in item.子组件" :key="subIndex" :item="subItem"/>
    </div>
  </Shape2>
</template>

<script setup>
import {defineProps} from 'vue';

const {item} = defineProps(['item']);
import {useCounterStore} from '@/stores/counter'
import Shape2 from "@/components/Shape2.vue";

const store = useCounterStore()

// 动态创建临时的canvas元素
var tempCanvas = document.createElement("canvas");
tempCanvas.width = 70;
tempCanvas.height = 30;
var tempCtx = tempCanvas.getContext("2d");
// 绘制内容到临时的canvas
tempCtx.fillStyle = "rgb(112, 139, 219)";
tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
tempCtx.font = "12px Arial";
tempCtx.fillStyle = "white";
tempCtx.strokeStyle = "rgb(112, 139, 219)";
tempCtx.strokeRect(0, 0, tempCanvas.width, tempCanvas.height);
tempCtx.fillText("松开放置", 10, 20);


function updateStyle(item, newStyle) {
  item.width = newStyle.width + "px"
  item.height = newStyle.height + "px"
  item.top = newStyle.top + "px"
  item.left = newStyle.left + "px"
}


const getItemStyle = (item) => ({
  position: 'absolute',
  top: item.top,
  left: item.left,
  width: item.width,
  height: item.height,
  border: item.border,
});
const getItemStyle2 = (item) => ({
  top: item.top,
  left: item.left,
  width: item.width,
  height: item.height,
});

store.当前拖拽组件数据 = ref({})

store.start_x = 0;
store.start_y = 0;

function 拖拽开始(event, v) {
  if (v.禁止拖动) {
    event.preventDefault();
    return
  }
  console.log("拖拽开始", v)
  store.当前拖拽组件数据.value = v
  //修改鼠标为拖动状态
  event.dataTransfer.effectAllowed = "move";

  // 获取当前鼠标相对于当前元素的相对位置
  store.start_x = event.offsetX;
  store.start_y = event.offsetY;
  console.log("start_x", store.start_x, "start_y", store.start_y)


  var img = new Image();
  img.src = tempCanvas.toDataURL();
  event.dataTransfer.setDragImage(img, 0, 0);
}

function 拖拽进入(event, v) {

  var img = new Image();
  img.src = tempCanvas.toDataURL();
  event.dataTransfer.setDragImage(img, 0, 0);
  if (v.禁止放置) {
    event.stopPropagation();
    return
  }
  console.log("拖拽进入", v)
  event.target.classList.add('高亮');
}

function 拖拽离开(event, v) {
  //查找所有的高亮 然后全部清除
  let 高亮的组件 = document.querySelectorAll(".高亮")
  高亮的组件.forEach((item, index) => {
    item.classList.remove('高亮');
  });
}


function 拖拽放下(event, v) {
  console.log("拖拽放下", v)
  if (v.禁止放置) {
    return
  }

  event.target.classList.remove('高亮');
  let 放置目标组件数据 = v
  console.log("当前拖拽组件数据", store.当前拖拽组件数据.value)
  console.log("放置目标组件数据", 放置目标组件数据)
  if (放置目标组件数据.名称 == store.当前拖拽组件数据.value.名称) {
    console.log("不能放置到自己身上")
    return
  }
  // 获取当前鼠标相对于当前元素的相对位置
  let x = event.offsetX;
  let y = event.offsetY;

  console.log("start_x", store.start_x, "start_y", store.start_y)
  console.log("x", x, "y", y)

  x = x - store.start_x
  y = y - store.start_y
  console.log("重新计算", "x", x, "y", y)


  store.当前拖拽组件数据.value.left = x + "px"
  store.当前拖拽组件数据.value.top = y + "px"

  递归删除(store.list, store.当前拖拽组件数据.value.名称)
  递归添加(store.list, store.当前拖拽组件数据.value, 放置目标组件数据.名称)
}

function 递归添加(源数据, 插入数据, 放置的容器名称) {
  console.log("递归添加", 源数据, 插入数据, 放置的容器名称)
  源数据.forEach((item, index) => {
    if (item.子组件 == undefined) {

    } else {
      if (item.名称 == 放置的容器名称) {
        // console.log("找到了", item.子组件)
        递归添加(item.子组件, 插入数据, "abc")
        item.子组件 = [插入数据, ...item.子组件]

      } else {
        递归添加(item.子组件, 插入数据, 放置的容器名称)
      }
    }
  });
}

function 递归删除(源数据, 删除的对象名称) {
  console.log("递归删除", 源数据, 删除的对象名称)
  源数据.forEach((item, index) => {
    if (item.名称 == 删除的对象名称) {
      源数据.splice(index, 1);
    }
    if (item.子组件 == undefined) {

    } else {
      递归删除(item.子组件, 删除的对象名称)
    }
  });
}

function 鼠标按下(event, v) {
  console.log("鼠标按下", v)
  store.当前组件索引 = v.名称
}

</script>

<style>
.子组件 {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

.子组件.高亮 {
  background-color: rgb(10 152 227 / 26%);
}
</style>