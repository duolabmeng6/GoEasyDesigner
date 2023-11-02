<template>
  <div :style="getItemStyle(item)">
    <el-table
        :border="item.边框表格"
        :data="item.表格项目"
        :stripe="item.斑马纹表格"
        style="width: 99%;height: 99%"
        :table-layout="item.表格布局"
        @selection-change="handleSelectionChange"
        row-key="id"
    >
      <el-table-column v-if="item.可选" type="selection" width="55"/>
      <el-table-column
          v-for="(item, index) in item.表头"
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
      this.item.表格选中项 = this.multipleSelection.value
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