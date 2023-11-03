<template>
  <div :style="getItemStyleShape(item)">
    <div v-show="item.visible || item.visible" :id="item.name" :class="{ 'disabled': item.disable || item.disable }"
         :style="{
        overflowY: item.overflowY || 'visible',
        overflowX: item.overflowX || 'visible'
      }" class="子组件" v-demo="item">
      <template v-if="item.componentName == 'Window'">
        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in item.childComponents" :key="subIndex"
                   :item="subItem" />
      </template>
      <template v-if="item.componentName == 'elContainer'">

        <component is="RenderDesignComponent" v-for="(subItem, subIndex) in item.childComponents" :key="subIndex"
                   :item="subItem" />
      </template>
      <template v-else-if="item.customListening">
        <component :is="item.componentName" :item="item" @CustomEvent="(n, v) => { onCustomEvent(n, v, item) }" />
      </template>
      <template v-else>
        <component :is="item.componentName" :item="item" />
      </template>



    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { 引入窗口数据 } from '@/窗口/窗口数据'
import { getItemStyleShape } from "@/public";

const { item } = defineProps(['item']);
const emits = defineEmits(["CustomEvent"]);

const store = 引入窗口数据()

const vDemo = {
  mounted: (el, binding) => {
    // console.log(binding.value) // => "hello!"
    let item = binding.value
    let EventList = {
      "click": "",
      "mousedown": "",
      "mouseup": "",
      "dblclick": "",
      "contextmenu": "",
      "mousemove": "",
      "focus": "",
      "blur": "",
      "keydown": "",
      "keyup": "",
      "mousewheel": ""
    }
    for (let EventName in EventList) {
      //检查是否存在 event_ 的对象名称
      if (item.hasOwnProperty("event_" + EventName)) {
        // console.log("存在", EventName, "EventName", EventName, item, item["event_" + EventName])
        el.addEventListener(EventName, function (e) {
          store.handleAllEvents(el, e, binding.value, item["event_" + EventName])
        });
      }
    }

  }
}
const onCustomEvent = (name, data, item) => {
  console.log("收到自定义事件", "eventName", name, "数据", data);

  // let callFuncName = item.名称 + "自定义事件"
  let callFuncName = item.name + name
  console.log("callFuncName", callFuncName)
  var dynamicFunction = undefined
  try {
    eval(`dynamicFunction = store.${callFuncName}`)
    dynamicFunction(name, data)
  } catch (e) {
    console.log("函数调用出错", callFuncName, "dynamicFunction", dynamicFunction, "e", e)
  }

}
</script>

<style>
.childComponents {
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
  opacity: 0.6;
  /* 可选：降低透明度来表示禁用状态 */
}

.子组件.高亮 {
  background-color: rgba(0, 166, 255, 0.3);
}
</style>