<template>
    <t-switch
        :label="item.label"
        :loading="item.loading"
        :size="item.size"
        v-model="item.value"
        @change="handleChange"
    />

</template>

<script setup>
import {getItemStyle} from "@/public";
import {defineEmits, defineProps} from "vue";

const {item} = defineProps(['item'])
const emits = defineEmits(["CustomEvent"]);

function onSendEvent(name, data) {
  emits("CustomEvent", name, data);
}

function handleChange() {
  onSendEvent('数据发生变化', item)
}


</script>
