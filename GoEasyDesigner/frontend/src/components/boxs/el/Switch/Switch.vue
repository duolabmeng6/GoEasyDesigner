<template>
    <el-switch
        :getItemStyle="getItemStyle(item)"
        v-model="item.选中"
        :size="item.尺寸"
        :active-text="item.选中文本"
        :inactive-text="item.未选中文本"
        :inline-prompt="item.内置文字"
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
