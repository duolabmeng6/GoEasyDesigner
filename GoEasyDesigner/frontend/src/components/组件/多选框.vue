<template>
    <el-checkbox
        :getItemStyle="getItemStyle(item)"

        v-model="item.选中"
                 :size="item.尺寸"
                 :border="item.带边框"
                 :label="item.标题"  />

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
