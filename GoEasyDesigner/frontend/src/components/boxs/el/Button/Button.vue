<template>
  <el-button
      :style="item.size=='custom' ? getItemStyle(item):''"
      v-show="item.visible"
      v-bind:disabled="item.disable"
      :type="item.buttonType"
      :size="item.size=='custom' ?'':item.size"
  >{{ item.text }}</el-button>
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
