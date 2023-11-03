<template>
    <el-slider
        :style="item.size=='custom' ? getItemStyle(item):''"
        style="width: 80%;margin:0px 20px"
        v-model="item.n"
               :size="item.size=='custom' ?'':item.size"
               :min="item.min"
               :max="item.max"
               :step="item.step"
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
