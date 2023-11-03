<template>
    <el-switch
        :getItemStyle="getItemStyle(item)"
        v-model="item.value"
        :size="item.size"
        :active-text="item.activeText"
        :inactive-text="item.inactiveText"
        :inline-prompt="item.inlinePrompt"
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
