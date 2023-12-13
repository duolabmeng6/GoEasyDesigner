<template>


  <div class="relative h-[100%] w-[100%] overflow-hidden rounded-xl" >
    <span class="all-gpts inherited-styles-for-exported-element" v-html="item.data.title" :style="{
    fontSize: item.fontSize,
  }"></span>

  </div>



</template>
<style scoped>


@keyframes text-gradient {
  0% {
    background-position: 0 0;
  }

  to {
    background-position: 200% 0;
  }
}

*, ::after, ::before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}

.inherited-styles-for-exported-element {
  color: transparent;
  cursor: default;
  //font-family: Lexend, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, BlinkMacSystemFont, "segoe ui", "helvetica neue", Arial, "noto sans", "apple color emoji", "segoe ui emoji", "segoe ui symbol", "noto color emoji";
  //font-size: 2.25rem;
  //font-weight: 700;
  letter-spacing: -.02em;
  line-height: 1.1;
  tab-size: 4;
}

* ::-webkit-scrollbar {
  width: 10px;
}

* ::-webkit-scrollbar-track {
  background-color: #fff;
}

* ::-webkit-scrollbar-thumb {
  background-color: #ddd6fe;
}

:disabled {
  cursor: default;
}

@media (min-width: 768px) {
  .inherited-styles-for-exported-element {
    font-size: 3rem;
    text-align: center;
  }
}

@media (min-width: 1280px) {
  .inherited-styles-for-exported-element {
    font-size: 3.75rem;
  }
}

@media (min-width: 1536px) {
  .inherited-styles-for-exported-element {
    font-size: 4.5rem;
  }
}

* ::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.all-gpts {
  animation: text-gradient 2s linear infinite;
  animation-range-end: normal;
  animation-range-start: normal;
  animation-timeline: auto;
  background-clip: text;
  background-image: linear-gradient(90deg, #fb7185, #d946ef, #6366f1, #d946ef, #fb7185), linear-gradient(90deg, #fb7185, #d946ef, #6366f1, #d946ef, #fb7185);
  background-size: 200% 100%;
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