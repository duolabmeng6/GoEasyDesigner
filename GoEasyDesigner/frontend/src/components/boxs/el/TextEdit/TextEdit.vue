<template>

  <div :style="item.size=='custom' ? getItemStyle(item):''">
    <el-input
        style="width: 100%;height: 100%;"
        :getItemStyle="getItemStyle(item)"
        :type="item.type"
        :placeholder="item.placeholder"
        :maxlength="item.maxlength"
        :size="item.size=='custom' ?'':item.size"
        v-model="item.text"/>
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
