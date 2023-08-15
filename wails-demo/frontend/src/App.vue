<template>
  <div class="huabu" :style="store.取窗口样式()"
  >
    <component class="test"
               v-for="(item, index) in store.组件列表"
               :is="item.组件名称"
               :style="getStyle(item.style)"
               :属性="store.组件列表[index]"
               data-index="index"
               @click="组件点击($event, index)"
    />

  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {WindowSetSize} from "../wailsjs/runtime";
// import 组件列表x from './组件列表.json'; // 根据实际文件路径进行修改
import {useCounterStore} from '@/stores/counter'
const store = useCounterStore()
store.初始化组件信息()



onMounted(() => {
  try {
    WindowSetSize(store.数据.窗口.宽度 + 13, store.数据.窗口.高度 + 35)
  }catch (e){

  }
})

function getStyle(style) {
  const result = {}
  result['width'] = style['width'] + "px"
  result['height'] = style['height'] + "px"
  result['top'] = style['top'] + "px"
  result['left'] = style['left'] + "px"
  return result
}





function 组件点击(e, index) {
  // console.log(store.组件列表[index],index)
  // console.log(store.组件列表[index].点击事件,index)
  // store.按钮1被点击()
  let 动态脚本 = "store."+store.组件列表[index].点击事件+"()"
  try {
    eval(动态脚本)
  }catch (e){
    console.log(e)
  }
}

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