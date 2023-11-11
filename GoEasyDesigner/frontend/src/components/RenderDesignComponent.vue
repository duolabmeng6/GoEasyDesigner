<template>
  <teleport to="#designer">
    <shape
        v-if="store.bodyLoaded && 检查id是否在选中数组中(item.id)"
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
      @contextmenu.stop="rightClick($event,item)"
      @keydown.stop="handleKeyDown($event)"
      style="tab-index: 0;"

  >
    <div
        v-show="item.visible || item.visible"
        :id="item.name"
        :class="{ 'disabled': item.disable || item.disable }"
        :data-id="item.data_id ? item.data_id : (item.data_id = generateUniqueId())"
        :style="{
              overflowY: item.overflowY || 'visible',
              overflowX: item.overflowX || 'visible'
        }"
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

      <template v-if="item.componentName == 'Window'">
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in item.childComponents" :key="subIndex"
                   :item="subItem"/>
      </template>

      <template v-if="item.componentName=='elContainer'">
        <template v-if="item.childComponents.length === 0">
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
            {{ item.name ? item.name : 'ContentArea' }}
          </div>
        </template>
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in item.childComponents" :key="subIndex"
                   :item="subItem"/>
      </template>
      <template v-else>
        <component :is="item.componentName" :item="item"/>
      </template>

    </div>
  </div>
</template>

<script setup>
import {defineProps, nextTick, watch} from 'vue';
import {useAppStore} from '@/stores/appStore'
import Shape from "@/components/Shape.vue";
import {getItemStyle2, getItemStyleShape} from "@/public";
import {v4 as uuidv4} from 'uuid';
import {menusEvent} from "vue3-menus";

const {item} = defineProps(['item']);

const store = useAppStore()

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
  // for (const property of properties) {
  //   if (newStyle[property] !== undefined) {
  //     item[property] = `${newStyle[property]}`;
  //   }
  // }

  // 先改变其他组件的位置
  store.当前多选组件ID.forEach(id => {
    if (id == item.id) {
      return
    }
    let _item = store.组件通过id查找结构(id)
    for (const property of properties) {
      if (newStyle[property] !== undefined) {
        _item[property] = parseInt(_item[property]) + (parseInt(newStyle[property]) - parseInt(item[property]))
        console.log(_item.id, property, _item[property])

      }
    }
    // _item.width = parseInt(_item.width) + width
    // _item.height =  parseInt(_item.height) + height
    // _item.top =  parseInt(_item.top) + top
    // _item.left =  parseInt(_item.left) + left
  })
  //最后才改变自己的位置,这样子就可以计算出差值
  for (const property of properties) {
    if (newStyle[property] !== undefined) {
      item[property] = `${newStyle[property]}`;
    }
  }
  return item
}

let timerId;

watch(item, (newValue, oldValue) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    shapeRect.value = getItemStyle2(item)
  }, 100);
});


store.start_x = 0;
store.start_y = 0;

function 拖拽开始(event, v) {
  if (v.noDrag) {
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
  if (v.noPlace) {
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
  if (v.noPlace) {
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

  // console.log("start_x", store.start_x, "start_y", store.start_y)
  // console.log("x", x, "y", y)


  if (放置目标组件数据.id == store.当前拖拽组件数据.id) {
    const offsetX = store.start_x - x;
    const offsetY = store.start_y - y;

    const initialLeft = parseInt(store.当前拖拽组件数据.left);
    const initialTop = parseInt(store.当前拖拽组件数据.top);


    const newLeft = initialLeft - offsetX; // 计算新的左偏移量
    const newTop = initialTop - offsetY;   // 计算新的上偏移量

    // console.log("重新计算", "newLeft:", newLeft, "newTop:", newTop, "offsetX:", offsetX, "offsetY:", offsetY);

    store.当前拖拽组件数据.left = newLeft;
    store.当前拖拽组件数据.top = newTop;
    return
  }
  x = x - store.start_x
  y = y - store.start_y
  // console.log("重新计算", "x", x, "y", y)
  if (store.当前拖拽组件数据.left != 'inherit') {
    store.当前拖拽组件数据.left = x
  }
  if (store.当前拖拽组件数据.top != 'inherit') {
    store.当前拖拽组件数据.top = y
  }

  store.HistoryManager.记录(JSON.stringify(store.list))
  console.log("删除组件");

  递归删除(store.list, store.当前拖拽组件数据.id)
  await nextTick()
  store.当前拖拽组件数据.fid = 放置目标组件数据.id
  递归添加(store.list, store.当前拖拽组件数据, 放置目标组件数据.id)
  await nextTick()

  store.HistoryManager.记录(JSON.stringify(store.list))

  // console.log(JSON.stringify(store.list, null, 2))
  store.取组件列表()
  store.当前组件索引 = store.当前拖拽组件数据.id
  store.当前多选组件ID = [store.当前组件索引]

}

function 递归添加(源数据, 插入数据, 放置的容器名称) {
  // console.log("递归添加", 源数据, 插入数据, 放置的容器名称)
  源数据.forEach((item, index) => {
    if (item.childComponents == undefined) {

    } else {
      if (item.id == 放置的容器名称) {
        // console.log("找到了", item.childComponents)
        // 递归添加(item.子组件, 插入数据, "abc")
        item.childComponents = [...item.childComponents, 插入数据]

      } else {
        递归添加(item.childComponents, 插入数据, 放置的容器名称)
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
    if (item.childComponents == undefined) {

    } else {
      递归删除(item.childComponents, 删除的对象名称)
    }
  });
}

function 检查放置目标是否为自身组件的子组件(源数据, 对象名称) {
  if (对象名称 == "" || 对象名称 == undefined || 源数据.childComponents == undefined) {
    return false
  }
  //遍历源数据
  for (let i = 0; i < 源数据.childComponents.length; i++) {
    let item = 源数据.childComponents[i];
    if (item.id == 对象名称) {
      return true
    }
    if (item.childComponents == undefined) {

    } else {
      if (检查放置目标是否为自身组件的子组件(item, 对象名称)) {
        console.log("当前对象名称", 对象名称, "当前组件名称", item.name)
        return true
      }
    }
  }
  return false
}

function rightClick(event, v) {
  event.preventDefault();
  store.当前组件索引 = v.id
  store.当前拖拽组件数据 = v
  console.log("右键组件的数据", v)
  //如果 store.当前多选组件ID 大于2才弹出
  if (store.当前多选组件ID.length > 1) {
    menusEvent(event, store.rightClickMenus);

  }
}

function 检查id是否在选中数组中(id) {

  return store.当前多选组件ID.includes(id)
}

function 鼠标按下(event, v) {
  console.log("鼠标按下", v)
  if (event.shiftKey) {
    console.log('Shift键被按住了！');
    if (store.当前多选组件ID.includes(v.id)) {
      store.当前多选组件ID.splice(store.当前多选组件ID.indexOf(v.id), 1)
      return
    }
    if (v.pid != undefined) {
      store.当前多选组件ID.push(v.pid)
    }else{
      store.当前多选组件ID.push(v.id)
    }
    console.log(store.当前多选组件ID)
  } else {
    store.当前多选组件ID = [v.id]
  }

  store.当前组件索引 = v.id
  store.当前拖拽组件数据 = v

  if (v.pid != undefined) {
    store.当前组件索引 = v.pid
  }
  console.log("store.当前组件索引", store.当前组件索引)

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
  try {
    let id = uuidv4();
    // 截取前面6位
    return id.substring(0, 6);
  } catch (e) {
    return 'fail'
  }
}


function handleKeyDown(event) {
  event.preventDefault()

  // 如果按下的是Cmd + S（Mac）或Ctrl + S（Windows/Linux）
  console.log("按下某键盘", event.key)
  // ctrl+c 复制组件
  if ((event.metaKey || event.ctrlKey) && event.key === "c") {
    console.log('Ctrl + C键被按住了！');
    store.复制组件 = store.当前多选组件ID
    return
  }
  // ctrl+v 粘贴组件
  if ((event.metaKey || event.ctrlKey) && event.key === "v") {
    console.log('Ctrl + V键被按住了！');
    if (store.复制组件.length == 0) {
      return
    }
    store.当前多选组件ID = []
    store.复制组件.forEach((item, index) => {
      let _item = store.组件通过id查找结构(item)
      let 新属性 = JSON.parse(JSON.stringify(_item))
      新属性.id = generateUniqueId()
      新属性.data_id = generateUniqueId()
      新属性.left = parseInt(新属性.left) + 10
      新属性.top = parseInt(新属性.top) + 10
      let 组件名称 = 新属性.componentRawName
      let k = store.获取索引(组件名称)
      新属性.name = k
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
      let pid = "1"
      if (新属性.fid != undefined) {
        pid = 新属性.fid
      }
      store.递归添加(store.list, 新属性, pid)
      console.log("复制的组件", 新属性)
    });
    store.HistoryManager.记录(JSON.stringify(store.list))
    store.取组件列表()
    return
  }

  //如果同时按下shift加方向键则是调整宽度高度
  if (event.shiftKey) {
    console.log('Shift键被按住了！');
    if (event.key === "ArrowLeft") {
      store.当前多选组件ID.forEach(id => {
        let item = store.组件通过id查找结构(id)
        item.width = parseInt(item.width) - 1
      })
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()

      store.当前多选组件ID.forEach(id => {
        let item = store.组件通过id查找结构(id)
        item.width = parseInt(item.width) + 1
      })
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()

      store.当前多选组件ID.forEach(id => {
        let item = store.组件通过id查找结构(id)
        item.height = parseInt(item.height) - 1
      })
    }
    if (event.key === "ArrowDown") {
      event.preventDefault()

      store.当前多选组件ID.forEach(id => {
        let item = store.组件通过id查找结构(id)
        item.height = parseInt(item.height) + 1
      })
    }
    return
  }

  // 键盘按下(event, store.当前组件索引)
  if (event.key === "ArrowLeft") {
    store.当前多选组件ID.forEach(id => {
      let item = store.组件通过id查找结构(id)
      item.left = parseInt(item.left) - 1
    })
  }
  if (event.key === "ArrowRight") {
    event.preventDefault()

    store.当前多选组件ID.forEach(id => {
      let item = store.组件通过id查找结构(id)
      item.left = parseInt(item.left) + 1
    })
  }
  if (event.key === "ArrowUp") {
    event.preventDefault()

    store.当前多选组件ID.forEach(id => {
      let item = store.组件通过id查找结构(id)
      item.top = parseInt(item.top) - 1
    })
  }
  if (event.key === "ArrowDown") {
    event.preventDefault()

    store.当前多选组件ID.forEach(id => {
      let item = store.组件通过id查找结构(id)
      item.top = parseInt(item.top) + 1
    })
  }


}

</script>

<style>


.子组件 {
  position: relative;
  width: 100%;
  height: 100%;
//overflow: hidden;

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

.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}


</style>