<template>
  <el-row :gutter="item.gutter" :justify="item.justify" style="height: 100%">
    <el-col v-for="(DivItem, DivItemIndex) in item.childComponents"
            :key="DivItemIndex"
            :span="DivItem.span"
    >
      <component is="RenderDesignComponent" v-for="(item2, DivItemIndex2) in [DivItem]" :key="DivItemIndex2"
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
