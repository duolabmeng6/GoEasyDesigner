<template>
  <div>
    <el-switch
        v-model="属性.选中"
        class="ml-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    />
  </div>

</template>

<script>
export default {
  props: {
    属性: {
      type: String,
      default: '',
    }
  },
}
</script>

<style>


</style>