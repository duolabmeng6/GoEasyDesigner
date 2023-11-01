<template>

  <div :style="item.尺寸=='custom' ? getItemStyle(item):''">
    <el-input
        style="width: 100%;height: 100%;"
        :getItemStyle="getItemStyle(item)"
        :type="item.输入框类型"
        :placeholder="item.提示文本"
        :maxlength="item.最大长度"
        :size="item.尺寸=='custom' ?'':item.尺寸"
        v-model="item.内容"/>
  </div>
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

<style>

.el-textarea__inner{
  height: 100%;
}

</style>
