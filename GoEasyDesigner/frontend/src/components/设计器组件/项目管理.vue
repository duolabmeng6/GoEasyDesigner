<template>
  <el-tree :data="store.项目文件列表" @node-click="handleNodeClick"/>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, shallowRef} from 'vue'
import {E文件枚举, E保存件对话框, E创建函数, E打开文件对话框, E读入文件} from "../../../wailsjs/go/main/App";

import {useCounterStore} from "@/stores/counter";
import {ElMessage} from "element-plus";
const store = useCounterStore()

const handleNodeClick = (data) => {
  store.当前代码编辑器路径 = data.path
  E读入文件(data.path ).then((res) => {
    console.log(res)
    store.代码编辑器内容 = res
    store.选择夹_中间现行选中项= "1"
  })
}
store.项目文件列表 = [
  {
    label: 'Level one 1',
  },
  {
    label: 'Level one 1',
  },
  {
    label: 'Level one 1',
  },
]
onMounted(() => {
  store.项目文件列表 = []
  if(store.客户端模式 == false){
    return
  }

})

</script>