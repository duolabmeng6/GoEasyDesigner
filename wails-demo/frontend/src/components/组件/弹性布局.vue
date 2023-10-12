<template>
  <el-row :gutter="item.列间隔" :justify="item.对齐方式" style="height: 100%">
    <el-col v-for="(DivItem, DivItemIndex) in item.子组件"
            :key="DivItemIndex"
            :span="DivItem.占比"
    >
      <component is="渲染组件" v-for="(item2, DivItemIndex2) in [DivItem]" :key="DivItemIndex2"
                 :item="item2"

      />
    </el-col>

  </el-row>
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
