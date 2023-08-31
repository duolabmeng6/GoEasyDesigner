<template>
  <el-row>
    <el-col :span="20">
      <RecursiveItem v-for="(item, index) in store.list" :key="index" :item="item"/>
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

      <el-col :span="24" v-if="store.当前拖拽组件数据 != undefined && store.当前拖拽组件数据.组件名称 == '选择夹'">
        <div v-for="(item, index) in store.当前拖拽组件数据.子组件">
          选项卡
          <div>
            <input v-model="item.title">
            <button @click="删除子组件(item)">删除</button>
          </div>
        </div>
        <button @click="新增子组件(store.当前拖拽组件数据)">增加</button>
        现行选中项 <input v-model="store.当前拖拽组件数据.现行选中项">

      </el-col>

      <el-col :span="24" v-if="store.当前拖拽组件数据 != undefined && store.当前拖拽组件数据.组件名称 == '按钮'">
        标题 <input v-model="store.当前拖拽组件数据.标题">
      </el-col>

    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from 'vue';
import RecursiveItem from "@/RecursiveItem.vue";
import {useCounterStore} from '@/stores/counter'

const store = useCounterStore()
let k = 0

function 删除子组件(item) {
  console.log("删除子组件", item)
  递归删除title(store.当前拖拽组件数据.子组件, item.title)

}

function 递归删除title(源数据, 名称) {
  // console.log("递归删除", 源数据, 名称)
  源数据.forEach((item, index) => {
    if (item.title == 名称) {
      源数据.splice(index, 1);
    }
    if (item.子组件 == undefined) {

    } else {
      递归删除title(item.子组件, 名称)
    }
  });
}

function 新增子组件(item) {
  k = k + 1
  let 插入数据 = {
    title: "选项卡" + k,
    子组件: [
      {
        名称: "选项卡" + k + 'tab布局容器' + k,
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        禁止放置: false,
        禁止拖动: true,
        子组件: []
      },

    ]
  }
  item.子组件 = [ ...item.子组件,插入数据]
  console.log(" store.当前拖拽组件数据", store.当前拖拽组件数据)
  nextTick().then(() => {
    store.当前组件索引 = item.名称
    store.当前拖拽组件数据 = item
  })
}

function 拖拽开始(event, 组件名称) {
  console.log("创建组件", 组件名称);
  k = k + 1
  if (组件名称 == "按钮") {
    store.当前拖拽组件数据 = {
      组件名称: 组件名称,
      名称: 组件名称 + k,
      标题: 组件名称 + k,
      top: "0px",
      left: "0px",
      width: "60px",
      height: "40px",
      禁止放置: false,
      子组件: [],
    }
  }
  if (组件名称 == "布局容器") {
    store.当前拖拽组件数据 = {
      组件名称: 组件名称,
      名称: 组件名称 + k,
      top: "0px",
      left: "0px",
      width: "200px",
      height: "200px",
      border: "1px solid red",
      禁止放置: false,
      子组件: [],
    }
  }
  if (组件名称 == "选择夹") {
    store.当前拖拽组件数据 = {
      组件名称: 组件名称,
      名称: 组件名称 + k,
      top: "150px",
      left: "440px",
      width: "300px",
      height: "300px",
      现行选中项:0,
      禁止放置: true,
      子组件: [
        {
          title: "选项卡1",
          子组件: [
            {
              名称: 组件名称 + k + 'tab布局容器1',
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              禁止放置: false,
              禁止拖动: true,
              子组件: []
            },

          ]
        },
        {
          title: "选项卡2",
          子组件: [
            {
              名称: 组件名称 + k + 'tab布局容器2',
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              禁止放置: false,
              禁止拖动: true,
              子组件: []
            },

          ]
        },
      ]
    }

  }
}

//
// const list = ref([
//   {
//     名称: '',
//     组件名称: "窗口",
//     top: "0px",
//     left: "0px",
//     width: "800px",
//     height: "600px",
//     border: "1px solid red",
//     禁止放置: false,
//     禁止拖动: true,
//     子组件: [
//       {
//         名称: '布局容器',
//         组件名称: "布局容器",
//         top: "100px",
//         left: "100px",
//         width: "300px",
//         height: "100px",
//         border: "1px solid red",
//         禁止放置: false,
//         子组件: [
//           {
//             名称: '按钮4',
//             组件名称: "按钮",
//             top: "40px",
//             left: "10px",
//             width: "50px",
//             height: "50px",
//             border: "1px solid red",
//             禁止放置: true,
//           },
//           {
//             名称: '按钮5',
//             组件名称: "按钮",
//
//             top: "50px",
//             left: "150px",
//             width: "50px",
//             height: "50px",
//             border: "1px solid red",
//             禁止放置: true,
//           },
//         ]
//       },
//       {
//         名称: '布局容器2',
//         组件名称: "布局容器",
//         top: "250px",
//         left: "100px",
//         width: "300px",
//         height: "300px",
//         border: "1px solid green",
//         禁止放置: false,
//         子组件: [
//           {
//             名称: '布局容器23',
//             top: "50px",
//             left: "10px",
//             width: "200px",
//             height: "200px",
//             border: "1px solid red",
//             禁止放置: false,
//             子组件: []
//           },
//         ]
//       },
//       {
//         名称: '按钮1',
//         组件名称: "按钮",
//
//         top: "0px",
//         left: "0px",
//         width: "50px",
//         height: "50px",
//         border: "1px solid red",
//         禁止放置: true,
//       },
//       {
//         名称: '按钮2',
//         组件名称: "按钮",
//
//         top: "0px",
//         left: "100px",
//         width: "50px",
//         height: "50px",
//         禁止放置: true,
//
//       },
//       {
//         名称: '按钮3',
//         组件名称: "按钮",
//
//         top: "0px",
//         left: "200px",
//         width: "50px",
//         height: "50px",
//         禁止放置: true,
//       },
//       {
//         名称: '选择夹',
//         组件名称: "选择夹",
//         top: "150px",
//         left: "440px",
//         width: "300px",
//         height: "300px",
//         禁止放置: true,
//         子组件: [
//           {
//             title: "选项卡1",
//             子组件: [
//               {
//                 名称: 'tab布局容器1',
//                 top: "0",
//                 left: "0",
//                 width: "100%",
//                 height: "100%",
//                 border: "1px solid red",
//                 禁止放置: false,
//                 禁止拖动: true,
//                 子组件: [
//                   {
//                     名称: '按钮1x',
//                     组件名称: "按钮",
//                     top: "0px",
//                     left: "0px",
//                     width: "50px",
//                     height: "50px",
//                     禁止放置: true,
//                   },
//                 ]
//               },
//
//             ]
//           },
//           {
//             title: "选项卡2",
//             子组件: [
//               {
//                 名称: 'tab布局容器2',
//                 top: "0",
//                 left: "0",
//                 width: "100%",
//                 height: "100%",
//                 border: "1px solid red",
//                 禁止放置: false,
//                 禁止拖动: true,
//                 子组件: [
//                   {
//                     名称: '按钮2x',
//                     组件名称: "按钮",
//                     top: "0px",
//                     left: "0px",
//                     width: "50px",
//                     height: "50px",
//                     禁止放置: true,
//                   },
//                 ]
//               },
//
//             ]
//           },
//         ]
//       },
//     ]
//   }
// ])
const list = ref([
  {
    "名称": "",
    "组件名称": "窗口",
    "top": "0px",
    "left": "0px",
    "width": "800px",
    "height": "600px",
    "border": "1px solid red",
    "禁止放置": false,
    "禁止拖动": true,
    "子组件": [
      {
        "组件名称": "选择夹",
        "名称": "选择夹1",
        "top": "163px",
        "left": "351px",
        "width": "300px",
        "height": "300px",
        "禁止放置": true,
        "现行选中项":0,
        "子组件": [
          {
            "title": "选项卡1",
            "子组件": [
              {
                "名称": "选择夹1tab布局容器1",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "禁止放置": false,
                "禁止拖动": true,
                "子组件": []
              }
            ]
          },
          {
            "title": "选项卡2",
            "子组件": [
              {
                "名称": "选择夹1tab布局容器2",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "禁止放置": false,
                "禁止拖动": true,
                "子组件": []
              }
            ]
          }
        ]
      }
    ]
  }
])
store.list = list

</script>

<style>
.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}
</style>