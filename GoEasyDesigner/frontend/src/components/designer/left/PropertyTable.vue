
<template>
  <component :is="props.store.当前组件名称2()"
             v-if="props.store.当前拖拽组件数据 != undefined"
             :item="props.store.当前拖拽组件数据"
  />
</template>
<script setup>
import {defineProps} from "vue";
const props = defineProps(['store']);

</script>