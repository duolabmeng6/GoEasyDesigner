<template>

  <el-tabs :type="item.风格类型" v-model="item.现行选中项" :style="getItemStyle(item)" style="overflow: hidden;padding: 0"
           v-show="item.可视"
           v-bind:disabled="item.禁用"
           :tab-position="item.标签位置"
  >
    <el-tab-pane
        v-for="(tabItem, tabItemIndex) in item.子组件"
        :key="tabItemIndex"
        :label="tabItem.标题"
    >
      <component is="渲染组件"  v-for="(tabItem2, tabItemIndex2) in [tabItem]" :key="tabItemIndex2" :item="tabItem2"/>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import {getItemStyle} from '@/public.js';

export default {
  methods: {getItemStyle},
  props: {
    item: {
      type: Object,
      default: '',
    }
  },
}
</script>
<style>
.el-tabs__content {
  height: 100%;
  padding: 0 !important;
}
.el-tabs__header.is-bottom{
  position: relative;
  top: -50px;
}
</style>