<template>
  <div>
    <el-button type="primary"  style="width: 100%;height: 100%;">{{ 属性.标题 }}</el-button>
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
