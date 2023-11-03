<template>
  <el-button
      :style="item.尺寸=='custom' ? getItemStyle(item):''"
      v-show="item.可视"
      v-bind:disabled="item.disable"
      :type="item.按钮类型"
      :size="item.尺寸=='custom' ?'':item.尺寸"

  >{{ item.text}}</el-button>
</template>

<script>
import {getItemStyle} from "@/public";

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
