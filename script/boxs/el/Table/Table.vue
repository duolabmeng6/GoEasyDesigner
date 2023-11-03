<template>
  <div :style="getItemStyle(item)">
    <el-table
        :border="item.border"
        :data="item.data"
        :stripe="item.stripe"
        style="width: 99%;height: 99%"
        :table-layout="item.tableLayout"
        @selection-change="handleSelectionChange"
        row-key="id"
    >
      <el-table-column v-if="item.select" type="selection" width="55"/>
      <el-table-column
          v-for="(item, index) in item.header"
          :fixed="item.fixed"
          :label="item.label" :prop="item.prop" :width="item.width"/>
    </el-table>
  </div>
</template>

<script>
import {getItemStyle} from '@/public.js';

export default {
  data: () => ({
    multipleSelection: [],
  }),
  methods: {
    getItemStyle,
    handleSelectionChange: function (val) {
      this.multipleSelection.value = val
      console.log("表格选中",this.multipleSelection.value)
      this.item.value = this.multipleSelection.value
    }
  },
  props: {
    item: {
      type: Object,
      default: '',
    }
  },
}
</script>