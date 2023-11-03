<template>

  <el-alert
      v-show="item.可视"
      v-bind:disabled="item.disable"
      :type="item.type"
      :title="item.标题"
      :description="item.description"
      :closable="item.closable"
      :center="item.center"
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
