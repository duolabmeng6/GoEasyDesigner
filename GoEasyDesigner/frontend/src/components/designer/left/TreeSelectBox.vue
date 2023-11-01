
<template>
  <el-tree-select
      v-if="props.store"
      v-model="props.store.当前组件索引"
      :data="props.store.组件列表tree"
      default-expand-all
      style="width: 100%;"
      @node-click="data=>组件树选中(data)"
  />

</template>
<script setup>
import {defineProps} from "vue";
const props = defineProps(['store']);
function 组件树选中(data) {
  props.store.当前拖拽组件数据 = props.store.组件通过id查找结构(data.id)
  console.log('组件树选中', props.store.当前拖拽组件数据)
  props.store.当前组件索引 = props.store.当前拖拽组件数据.id
}

</script>