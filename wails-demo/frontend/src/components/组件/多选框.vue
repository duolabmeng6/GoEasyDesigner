<template>
  <div>
    <el-checkbox v-model="属性.选中" :label="属性.文本" size="large" />
  </div>

</template>

<script>
export default {
  props: {
    属性: {
      type: Object,
      default: '',
    }
  },
}
</script>

<style>


</style>