<template>
  <div class="huabu" ref="huabu"
  >
    <component class="test"
               v-for="(item, index) in 组件列表"
               :is="item.组件名称"
               :style="getStyle(item.style)"
               :属性="组件列表[index]"
               data-index="index"
               @click="组件点击($event, index)"
    />

  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {WindowSetSize} from "../wailsjs/runtime";
import * as action from '../wailsjs/go/main/App'
import 组件列表x from './组件列表.json'; // 根据实际文件路径进行修改

const 组件列表 = ref(组件列表x)
console.log(组件列表 )
// snip
// const 组件列表 =

function getStyle(style) {
  const result = {}
  result['width'] = style['width'] + "px"
  result['height'] = style['height'] + "px"
  result['top'] = style['top'] + "px"
  result['left'] = style['left'] + "px"
  return result
}

const huabu = ref(null);

onMounted(() => {
  const width = ref(0);
  const height = ref(0);

  //获取 huabu的 实际可视像素宽度 高度
  width.value = huabu.value.clientWidth;
  height.value = huabu.value.clientHeight;

  console.log(width.value, height.value)

  WindowSetSize(width.value+13, height.value+35)
})


function 组件点击(e, index) {
  try {
    console.log(组件列表[index].点击事件)
    eval(组件列表[index].点击事件)
  } catch (e) {
    console.log(e)
  }
  // action.Greet("点击事件").then(result => {console.log(result)})
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
  width: 500px;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.test {
  position: absolute;
}


</style>