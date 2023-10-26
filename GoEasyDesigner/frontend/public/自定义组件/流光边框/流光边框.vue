<template>
  <div class="relative h-[100%] w-[100%] overflow-hidden rounded-xl bg-white" :style="{
    fontSize: item.fontSize,
  }">
    <div
        class="bk relative left-[3px] top-[3px] z-10 flex h-24 h-[calc(100%-6px)] w-[calc(100%-6px)] items-center justify-center rounded-xl text-fuchsia-50"
        :style="{
    background: item.data.background
        }">
      <p v-html="item.data.title" class="z-20 animate-textclip bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-[200%_auto] bg-clip-text text-center font-black text-transparent">
      </p>
    </div>
    <div
        class="absolute left-[-450%] top-[-450%] h-[1000%] w-[1000%] animate-spin bg-[conic-gradient(teal,purple,orange)]"></div>
  </div>
</template>
<style scoped>

@keyframes textclip {
  0%,
  100% {
    background-position: 200%;
  }
  50% {
    background-position: -200% center;
  }
}

.animate-textclip {
  animation: textclip 4s linear infinite;
}
</style>

<script setup>
import {defineEmits, defineProps} from "vue";

const {item} = defineProps(['item'])
console.log("自定义组件数据", item);
const emits = defineEmits(["CustomEvent"]);
console.log("自定义组件事件", emits);

function onSendEvent(name, data) {
  console.log("自定义组件", name, "发送数据", item.data);
  emits("CustomEvent", name, data);
}


</script>