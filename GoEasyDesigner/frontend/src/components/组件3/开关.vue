<template>
  <div>
    <el-switch
        v-model="属性.选中"
        class="ml-2"
    />
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