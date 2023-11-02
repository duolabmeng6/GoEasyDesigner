<template>
    <el-slider
        :style="item.尺寸=='custom' ? getItemStyle(item):''"
        style="width: 80%;margin:0px 20px"
        v-model="item.位置"
               :size="item.尺寸=='custom' ?'':item.尺寸"
               :min="item.最小值"
               :max="item.最大值"
               :step="item.步长"
    />

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
