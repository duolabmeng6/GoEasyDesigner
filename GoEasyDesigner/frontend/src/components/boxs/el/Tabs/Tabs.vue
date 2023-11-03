<template>

  <el-tabs :type="item.type" v-model="item.value" :style="getItemStyle(item)" style="overflow: hidden;padding: 0"
           v-show="item.visible"
           v-bind:disabled="item.disable"
           :tab-position="item.tagPosition"
           stretch="true"
  >
    <el-tab-pane
        v-for="(tabItem, tabItemIndex) in item.childComponents"
        :key="tabItemIndex"
        :label="tabItem.text"
    >
      <component is="RenderDesignComponent"  v-for="(tabItem2, tabItemIndex2) in [tabItem]" :key="tabItemIndex2" :item="tabItem2"/>
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
  padding: 0 !important;
  overflow: hidden;
}
.el-tabs__header.is-bottom{
  position: relative;
  top: -50px;
}

</style>