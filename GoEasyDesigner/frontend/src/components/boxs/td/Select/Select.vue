<template>
  <t-select
      v-model="item.value"
      :onChange="onSendEvent('onChange',item.value)"
      :multiple="item.multiple"
      :auto-width="item.autoWidth"
      :borderless="item.borderless"
      :size="item.size"
  >
    <t-option
        v-for="(v, i) in item.options"
        :label="v.label"
        :key="v.label"
        :value="v.value"

    />
  </t-select>


</template>

<script setup>
import {defineEmits, defineProps} from "vue";

const {item} = defineProps(['item'])
const emits = defineEmits(["CustomEvent"]);

function onSendEvent(name, data) {
  console.log("自定义组件", name, "发送数据", data);
  emits("CustomEvent", name, data);
}

</script>
