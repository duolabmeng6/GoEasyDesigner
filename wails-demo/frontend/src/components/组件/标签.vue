<template>
    <el-text
        :getItemStyle="getItemStyle(item)"
        :size="item.尺寸"
        :truncated="item.省略号"
        :tag="item.文字样式"
    >{{ item.标题 }}</el-text>
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