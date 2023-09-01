<template>
  <div style="position: relative;">
    <component is="渲染组件" v-for="(item, index) in 窗口.list" :key="index" :item="item"/>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {引入窗口数据} from '@/窗口/窗口数据'
const 窗口 = 引入窗口数据()
onMounted(() => {
  窗口.初始化()
})


</script>

<style>
body{
  margin: 0;
  padding: 0;
}

</style>