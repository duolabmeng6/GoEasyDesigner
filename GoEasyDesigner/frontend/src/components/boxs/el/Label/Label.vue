<template>
  <div
      class="text-container"
      :style="getItemStyle(item)"
  >
    <el-text
        :style="{color: item.corlor,fontSize: item.fontSize+'px'}"
        :class="item.tagPosition"
        :size="item.size"
        :tag="item.tag"
        :truncated="item.truncated"
    >{{ item.text}}
    </el-text>
  </div>

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
<style>
.text-container {
  display: flex;
  flex-wrap: wrap;
}


.text-top-left {
  position: absolute;
  top: 0;
  left: 0;
}

.text-top-right {
  position: absolute;
  top: 0;
  right: 0;
}

.text-bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
}

.text-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}

.text-top-center {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.text-bottom-center {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.text-left-center {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.text-right-center {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.text-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>