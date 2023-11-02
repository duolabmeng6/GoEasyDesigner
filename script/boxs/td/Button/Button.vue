<template>

    <t-button
        v-show="item.visible"
        v-bind:disabled="item.disable"
        :block="item.block"
        :ghost="item.ghost"
        :loading="item.loading"
        :shape="item.shape"
        :size="item.size"
        :theme="item.theme"
        :variant="item.variant"
    >{{ item.text }}</t-button>


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
