<template>
  <el-button
      :style="getItemStyle(item)"
      v-show="item.可视"
      v-bind:disabled="item.禁用"
      :type="item.按钮类型"
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
