<template>

  <el-radio-group v-model="item.value" :size="item.size">
    <template v-if="item.buttonGroup">
      <el-radio-button
          v-for="(v, i) in item.options"
          :label="v.value"
          :border="item.border"

      >{{ v.label }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
          v-for="(v, i) in item.options"
          :label="v.value"
          :border="item.border"

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
