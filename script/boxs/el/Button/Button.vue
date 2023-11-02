<template>
  <el-button
      :style="item.尺寸=='custom' ? getItemStyle(item):''"
      v-show="item.可视"
      v-bind:disabled="item.禁用"
      :type="item.按钮类型"
      :size="item.尺寸=='custom' ?'':item.尺寸"

  >{{ item.标题 }}</el-button>
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
