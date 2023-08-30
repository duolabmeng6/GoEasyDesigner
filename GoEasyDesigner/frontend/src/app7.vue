<template>
  <div>
    <RecursiveItem v-for="(item, index) in store.list" :key="index" :item="item"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import RecursiveItem from "@/RecursiveItem.vue";
import {useCounterStore} from '@/stores/counter'
const store = useCounterStore()

const list = ref([
  {
    名称: '',
    组件名称:"窗口",
    top: "0px",
    left: "0px",
    width: "800px",
    height: "600px",
    border: "1px solid red",
    禁止放置: false,
    禁止拖动:true,
    子组件: [
      {
        名称: '布局容器',
        组件名称:"布局容器",
        top: "100px",
        left: "100px",
        width: "300px",
        height: "100px",
        border: "1px solid red",
        禁止放置: false,
        子组件: [
          {
            名称: '按钮4',
            组件名称:"按钮",
            top: "40px",
            left: "10px",
            width: "50px",
            height: "50px",
            border: "1px solid red",
            禁止放置: true,
          },
          {
            名称: '按钮5',
            组件名称:"按钮",

            top: "50px",
            left: "150px",
            width: "50px",
            height: "50px",
            border: "1px solid red",
            禁止放置: true,
          },
        ]
      },
      {
        名称: '布局容器2',
        组件名称:"布局容器",
        top: "250px",
        left: "100px",
        width: "300px",
        height: "300px",
        border: "1px solid green",
        禁止放置: false,
        子组件: [
          {
            名称: '布局容器23',
            top: "50px",
            left: "10px",
            width: "200px",
            height: "200px",
            border: "1px solid red",
            禁止放置: false,
            子组件: []
          },
        ]
      },
      {
        名称: '按钮1',
        组件名称:"按钮",

        top: "0px",
        left: "0px",
        width: "50px",
        height: "50px",
        border: "1px solid red",
        禁止放置: true,
      },
      {
        名称: '按钮2',
        组件名称:"按钮",

        top: "0px",
        left: "100px",
        width: "50px",
        height: "50px",
        禁止放置: true,

      },
      {
        名称: '按钮3',
        组件名称:"按钮",

        top: "0px",
        left: "200px",
        width: "50px",
        height: "50px",
        禁止放置: true,
      },
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