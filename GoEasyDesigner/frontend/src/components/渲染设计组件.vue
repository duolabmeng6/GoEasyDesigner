<template>
  <teleport to="#designer">
    <shape
        v-if="store.bodyLoaded && store.当前组件索引 == item.id"
        :data-id="item.data_id ? item.data_id : (item.data_id = generateUniqueId())"
        :index="item.id"
        :item_data="item"
        :nowIndex="store.当前组件索引"
        :style="{ ...shapeRect, ...getItemStyle2(item) }"
        class="shape"
        style="position: absolute;pointer-events: none;"
        @update-style="updateStyle"
        @删除="id=>store.递归删除id(store.list,id)"

    />
    <div
        :class="{ 'custom-input': isHovered(item.data_id) }"
        :style="{ ...shapeRect, ...getItemStyle2(item) }"
        class="highlight_border"
        style="position: absolute;pointer-events: none;"
    ></div>
  </teleport>
  <div
      :style="getItemStyleShape(item)"
  >
    <div
        v-show="item.可视"
        :id="item.名称"
        :class="{ 'disabled': item.禁用 }"
        :data-id="item.data_id ? item.data_id : (item.data_id = generateUniqueId())"
        class="子组件"
        data-放置="1"
        draggable="true"
        @mouseout="clearHoveredDiv"
        @mouseover.stop="setHoveredDiv(item.data_id)"
        @dblclick.stop="store.组件双击事件(item)"
        @dragstart.stop="拖拽开始($event,item)"
        @dragover.prevent="拖拽进入($event,item)"
        @dragleave.prevent="拖拽离开($event,item)"
        @drop.stop="拖拽放下($event,item)"
        @click.stop="鼠标按下($event,item)"

    >
      <template v-if="item.组件名称=='按钮'">
        <component is="按钮" :item="item"/>
      </template>
      <template v-else-if="item.组件名称=='布局容器'">
        <template v-if="item.子组件.length === 0">
          <div style="width: 100%;
                       background: rgba(10,19,37,.05);
                      border: 1px dashed #ced0d3;
                      color: rgb(184, 186, 191);
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      pointer-events: none;
">
            {{ item.名称 ? item.名称 : '内容区域' }}
          </div>
        </template>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件" :key="subIndex" :item="subItem"/>

      </template>
      <template v-else-if="item.组件名称=='选择夹'">
        <component is="选择夹" :item="item"/>
      </template>
      <template v-else-if="item.组件名称=='常用布局'">
        <component is="常用布局" :item="item"/>
      </template>
      <template v-else-if="item.组件名称=='弹性布局'">
        <component is="弹性布局" :item="item"/>
      </template>
      <template v-else>
        <component :is="item.组件名称" :item="item"/>
        <component is="渲染组件" v-for="(subItem, subIndex) in item.子组件" :key="subIndex" :item="subItem"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import {defineProps, nextTick, watch, onUnmounted, onMounted, onUpdated, onBeforeUpdate} from 'vue';

const {item} = defineProps(['item']);
import {useCounterStore} from '@/stores/counter'
import Shape from "@/components/Shape.vue";
import {getItemStyle, getItemStyle2, getItemStyleShape} from "@/public";

const store = useCounterStore()

import {v4 as uuidv4} from 'uuid';

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


const shapeRect = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
});

async function updateStyle(item, newStyle) {
  const properties = ['width', 'height', 'top', 'left'];

  for (const property of properties) {
    if (newStyle[property] !== undefined) {
      item[property] = `${newStyle[property]}`;
    }
  }
  upShapeRect(item);
  return item
}

let timerId;

watch(item, (newValue, oldValue) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    upShapeRect(item);
  }, 100);
});


async function upShapeRect(item) {
  shapeRect.value = getItemStyle2(item)
}

store.start_x = 0;
store.start_y = 0;

function 拖拽开始(event, v) {
  if (v.禁止拖动) {
    event.preventDefault();
    return
  }
  console.log("拖拽开始", v)
  store.当前拖拽组件数据 = v
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
  // console.log("拖拽进入", v)
  event.target.classList.add('高亮');
}

function 拖拽离开(event, v) {
  //查找所有的高亮 然后全部清除
  let 高亮的组件 = document.querySelectorAll(".高亮")
  高亮的组件.forEach((item, index) => {
    item.classList.remove('高亮');
  });
}


async function 拖拽放下(event, v) {
  console.log("拖拽放下", v)
  if (v.禁止放置) {
    return
  }

  event.target.classList.remove('高亮');
  let 放置目标组件数据 = v
  console.log("当前拖拽组件数据", store.当前拖拽组件数据)
  console.log("放置目标组件数据", 放置目标组件数据)
  if (检查放置目标是否为自身组件的子组件(store.当前拖拽组件数据, 放置目标组件数据.id)) {
    console.log("当前目标子组件是自己的 不能放置")
    return;
  }


  // 获取当前鼠标相对于当前元素的相对位置
  let x = event.offsetX;
  let y = event.offsetY;

  console.log("start_x", store.start_x, "start_y", store.start_y)
  console.log("x", x, "y", y)


  if (放置目标组件数据.id == store.当前拖拽组件数据.id) {
    const offsetX = store.start_x - x;
    const offsetY = store.start_y - y;

    const initialLeft = parseInt(store.当前拖拽组件数据.left);
    const initialTop = parseInt(store.当前拖拽组件数据.top);


    const newLeft = initialLeft - offsetX; // 计算新的左偏移量
    const newTop = initialTop - offsetY;   // 计算新的上偏移量

    console.log("重新计算", "newLeft:", newLeft, "newTop:", newTop, "offsetX:", offsetX, "offsetY:", offsetY);

    store.当前拖拽组件数据.left = newLeft;
    store.当前拖拽组件数据.top = newTop;
    return
  }
  x = x - store.start_x
  y = y - store.start_y
  console.log("重新计算", "x", x, "y", y)
  store.当前拖拽组件数据.left = x
  store.当前拖拽组件数据.top = y

  递归删除(store.list, store.当前拖拽组件数据.id)
  await nextTick()
  递归添加(store.list, store.当前拖拽组件数据, 放置目标组件数据.id)
  await nextTick()


  console.log(JSON.stringify(store.list, null, 2))
  store.取组件列表()
  store.当前组件索引 = store.当前拖拽组件数据.id
  await nextTick()


}

function 递归添加(源数据, 插入数据, 放置的容器名称) {
  // console.log("递归添加", 源数据, 插入数据, 放置的容器名称)
  源数据.forEach((item, index) => {
    if (item.子组件 == undefined) {

    } else {
      if (item.id == 放置的容器名称) {
        // console.log("找到了", item.子组件)
        // 递归添加(item.子组件, 插入数据, "abc")
        item.子组件 = [插入数据, ...item.子组件]

      } else {
        递归添加(item.子组件, 插入数据, 放置的容器名称)
      }
    }
  });
}

function 递归删除(源数据, 删除的对象名称) {
  // console.log("递归删除", 源数据, 删除的对象名称)
  源数据.forEach((item, index) => {
    if (item.id == 删除的对象名称) {
      源数据.splice(index, 1);
    }
    if (item.子组件 == undefined) {

    } else {
      递归删除(item.子组件, 删除的对象名称)
    }
  });
}

function 检查放置目标是否为自身组件的子组件(源数据, 对象名称) {
  if (对象名称 == "" || 对象名称 == undefined || 源数据.子组件 == undefined) {
    return false
  }
  //遍历源数据
  for (let i = 0; i < 源数据.子组件.length; i++) {
    let item = 源数据.子组件[i];
    if (item.id == 对象名称) {
      return true
    }
    if (item.子组件 == undefined) {

    } else {
      if (检查放置目标是否为自身组件的子组件(item, 对象名称)) {
        console.log("当前对象名称", 对象名称, "当前组件名称", item.名称)
        return true
      }
    }
  }
  return false
}


function 鼠标按下(event, v) {
  console.log("鼠标按下", v)
  store.当前组件索引 = v.id
  store.当前拖拽组件数据 = v

  if (v.父容器id != undefined) {
    store.当前组件索引 = v.父容器id
    // store.当前拖拽组件数据 = store.组件通过id查找结构(v.父容器id)
    // console.log("当前拖拽组件数据", store.当前拖拽组件数据)
    // console.log("v.父容器id", v.父容器id)


  }

}

function setHoveredDiv(index) {
  store.hoveredDiv = index;
}

function clearHoveredDiv() {
  store.hoveredDiv = "";
}

function isHovered(index) {
  return store.hoveredDiv === index;
}

function generateUniqueId() {
  let id = uuidv4();
  // 截取前面6位
  return id.substring(0, 6);
}

</script>

<style>


.子组件 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

}


.custom-input {
  border: 1px dashed #409EFF;
}

.el-tabs {
  overflow: visible !important;
  width: auto !important;
}


.disabled {
  pointer-events: none;
  opacity: 0.6; /* 可选：降低透明度来表示禁用状态 */
}
</style>