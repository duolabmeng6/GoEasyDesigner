<template>
  <div>
    <el-input v-model="属性.内容" placeholder="" style="width: 100%;height: 100%;" />

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