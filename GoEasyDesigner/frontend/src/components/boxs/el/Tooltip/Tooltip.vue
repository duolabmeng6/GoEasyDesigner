<template>

  <el-alert
      v-show="item.可视"
      v-bind:disabled="item.禁用"
      :type="item.提示类型"
      :title="item.标题"
      :description="item.描述"
      :closable="item.可否关闭"
      :center="item.文字居中"
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
