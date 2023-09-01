<template>
  <el-tree :data="store.支持库列表" @node-click="handleNodeClick"/>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'

import {useCounterStore} from "@/stores/counter";

const store = useCounterStore()

const handleNodeClick = (data) => {
  console.log(data)
  store.帮助信息 = data.label + "帮助信息"

}
store.支持库列表 = [
  {
    label: '易函数(jsefun)核心支持库',
    children: [
      {
        label: '磁盘操作',
        children: [
          {
            label: '读入文件',
          },
          {
            label: '写出文件',
          }]
      }
    ]
  },
  {
    label: '加解密支持库',
    children: [
      {
        label: '磁盘操作',
        children: [
          {
            label: '读入文件',
          },
          {
            label: '写出文件',
          }]
      }
    ]
  },

]
onMounted(() => {

})

</script>