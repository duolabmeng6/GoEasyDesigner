<template>
  <el-slider
      :style="item.size=='custom'"
      style="width: 80%;margin:0px 20px"
      v-model="item.n"
      :size="item.size=='custom' ?'':item.size"
      :min="item.min"
      :max="item.max"
      :step="item.step"
      :format-tooltip="formatTooltip"
  />
  <el-button>abv</el-button>

</template>

<script setup>
import {defineEmits, defineProps} from "vue";

const {item} = defineProps(['item'])
console.log("自定义组件数据", item);
const emits = defineEmits(["CustomEvent"]);
console.log("自定义组件事件", emits);

// secondsToClockTime converts seconds to clock time in the format HH:mm:ss.
function secondsToClockTime(secs) {
  let hours = Math.floor(secs / 3600);
  secs %= 3600;
  let minutes = Math.floor(secs / 60);
  secs %= 60;

  let str = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  return str;
}


function formatTooltip(index){

  return secondsToClockTime(index)
}

</script>