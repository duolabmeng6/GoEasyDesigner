<template>

  <el-alert
      v-show="item.visible"
      v-bind:disabled="item.disable"
      :type="item.type"
      :title="item.text"
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
