<template>
  <el-row style="height: 100%" :gutter="item.列间隔" :justify="item.对齐方式" >
    <el-col v-for="(tabItem, tabItemIndex) in item.子组件"
            :key="tabItemIndex"
            :span="tabItem.子组件[0].占比"
    >
      <component is="渲染组件" v-for="(tabItem2, tabItemIndex2) in tabItem.子组件" :key="tabItemIndex2"
                 :item="tabItem2"

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
