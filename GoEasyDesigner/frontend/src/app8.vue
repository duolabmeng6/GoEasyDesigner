<template>
  <el-row>
    <el-col :span="4">
          <component v-if="store.当前拖拽组件数据 != undefined"
                     :is="store.当前组件名称2()"
                     @添加事件被选择="添加事件被选择"
                     :item="store.当前拖拽组件数据"
          />

    </el-col>
    <el-col :span="16">
      <div style="position: relative">
        <RecursiveItem v-for="(item, index) in store.list" :key="index" :item="item"/>

      </div>
    </el-col>
    <el-col :span="4">
      <el-col :span="24">
        <el-button
            draggable="true"
            @dragstart="拖拽开始($event,'布局容器')"
        >布局容器
        </el-button>
      </el-col>

      <el-col :span="24">
        <el-button
            draggable="true"
            @dragstart="拖拽开始($event,'按钮')"
        >按钮
        </el-button>
      </el-col>
      <el-col :span="24">
        <el-button
            draggable="true"
            @dragstart="拖拽开始($event,'选择夹')"
        >选择夹
        </el-button>
      </el-col>


    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from 'vue';
import RecursiveItem from "@/RecursiveItem.vue";
import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()

function 拖拽开始(event, 组件名称) {
  console.log("创建组件", 组件名称);
  let k;
  k = store.获取索引("按钮")
  if (组件名称 == "按钮") {
    store.当前拖拽组件数据 = {
      id: store.获取随机id(),
      组件名称: 组件名称,
      名称: 组件名称 + k,
      标题: 组件名称 + k,
      top: "0",
      left: "0",
      width: "60",
      height: "40",
      禁止放置: false,
      按钮类型: "default",
      可视: true,
      禁止: false,
      层级:0,
      子组件: [],
    }
  }
  if (组件名称 == "布局容器") {
    store.当前拖拽组件数据 = {
      id: store.获取随机id(),
      组件名称: 组件名称,
      名称: 组件名称 + k,
      top: "0",
      left: "0",
      width: "200",
      height: "200",
      border: "1px solid red",
      禁止放置: false,
      按钮类型: "default",
      可视: true,
      禁止: false,
      层级:0,
      子组件: [],
    }
  }
  if (组件名称 == "选择夹") {
    let id = store.获取随机id()
    store.当前拖拽组件数据 = {
      id: id,
      组件名称: 组件名称,
      名称: 组件名称 + k,
      top: "150",
      left: "440",
      width: "300",
      height: "300",
      现行选中项: "0",
      禁止放置: true,
      可视: true,
      禁止: false,
      层级:0,
      风格类型:"border-card",
      标签位置:"top",
      子组件: [
        {
          id: store.获取随机id(),
          标题: "选项卡" + store.获取索引(id + "选项卡"),
          子组件: [
            {
              id: store.获取随机id(),
              组件名称: "布局容器",
              名称: "",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              禁止放置: false,
              禁止拖动: true,
              可视: true,
              禁止: false,
              层级:0,
              子组件: []
            },

          ]
        },
        {
          标题: "选项卡" + store.获取索引(id + "选项卡"),
          id: store.获取随机id(),
          子组件: [
            {
              id: store.获取随机id(),
              组件名称: "布局容器",
              名称: "",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              禁止放置: false,
              禁止拖动: true,
              可视: true,
              禁止: false,
              层级:0,
              子组件: []
            },

          ]
        },
      ]
    }

  }


}

const list = ref([
  {
    "名称": "窗口",
    "组件名称": "窗口",
    "top": "0",
    "left": "0",
    "width": "500",
    "height": "800",
    "border": "1px solid red",
    "禁止放置": false,
    "禁止拖动": true,
    "禁止": false,
    "可视": true,
    "子组件": []
  }
])
store.list = list

</script>

<style>
.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}
</style>