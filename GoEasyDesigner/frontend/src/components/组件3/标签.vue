<template>
  <div>
    <el-text class="mx-1" style="width: 100%;height: 100%;">{{ 属性.标题 }}</el-text>
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
