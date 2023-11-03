<template>

  <el-checkbox-group v-model="item.currentSelected" :size="item.size">
    <template v-if="item.buttonGroup">
      <el-checkbox-button
          v-for="(v, i) in item.options"
          :label="v.value"
          :border="item.withBorder"

      >{{ v.label }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
          v-for="(v, i) in item.options"
          :label="v.value"
          :border="item.withBorder"

      >{{ v.label }}

      </el-checkbox>
    </template>


  </el-checkbox-group>

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
