<template>
  <div class="huabu" :style="窗口.取窗口样式()"
  >
    <component class="test"
               v-for="(item, index) in 窗口.组件列表"
               :is="item.组件名称"
               :style="窗口.取组件样式(item.style)"
               :属性="窗口.组件列表[index]"
               data-index="index"
               @click="窗口.组件点击($event, index)"
    />

  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {WindowSetSize} from "../wailsjs/runtime";
import {引入窗口数据} from '@/stores/窗口数据'
const 窗口 = 引入窗口数据()
onMounted(() => {
  窗口.初始化()
})


</script>

<style>

* {
  margin: 0;
  padding: 0;
}

body {
  user-select: none;

}

.huabu {
  background: rgb(240, 240, 240);
  position: relative;
  overflow: hidden;
}

.test {
  position: absolute;
}


</style>