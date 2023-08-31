<template>

  <el-radio-group v-model="item.现行选中项" :size="item.尺寸">
    <template v-if="item.按钮组">
      <el-radio-button
          v-for="(v, i) in item.选项"
          :label="v.value"
          :border="item.带边框"

      >{{ v.label }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
          v-for="(v, i) in item.选项"
          :label="v.value"
          :border="item.带边框"

      >{{ v.label }}

      </el-radio>
    </template>


  </el-radio-group>

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
