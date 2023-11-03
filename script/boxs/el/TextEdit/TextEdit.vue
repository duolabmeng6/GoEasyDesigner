<template>

  <div :style="item.尺寸=='custom' ? getItemStyle(item):''">
    <el-input
        style="width: 100%;height: 100%;"
        :getItemStyle="getItemStyle(item)"
        :type="item.type"
        :placeholder="item.placeholder"
        :maxlength="item.maxlength"
        :size="item.尺寸=='custom' ?'':item.尺寸"
        v-model="itemtext"/>
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
