<template>
  <t-button

      v-show="item.visible"
  >{{ item.text }}</t-button>
</template>

<script>

export default {
  methods: {},
  props: {
    item: {
      type: Object,
      default: '',
    }
  },
}
</script>
