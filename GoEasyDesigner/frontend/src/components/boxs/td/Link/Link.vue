<template>
  <t-link
      :content="item.text"
      :disabled="item.disable"
      :download="item.download"
      :hover="item.hover"
      :href="item.href"
      :prefixIcon="item.prefixIcon"
      :size="item.size"
      :suffixIcon="item.suffixIcon"
      :target="item.target"
      :theme="item.theme"
      :underline="item.underline"
  ></t-link>

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
