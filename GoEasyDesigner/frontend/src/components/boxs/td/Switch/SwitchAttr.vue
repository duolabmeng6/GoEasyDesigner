<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="common-properties" :item="item" />


      <el-form-item label="label">
        <el-input v-model="item.label[0]" />
        <el-input v-model="item.label[1]" />
      </el-form-item>
      <el-form-item label="loading">
        <el-switch v-model="item.loading" />
      </el-form-item>
      <el-form-item label="size">
        <el-select v-model="item.size" style="width: 100%">
          <el-option
              v-for="(item, index) in sizeOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="value">
        <el-switch v-model="item.value" />
      </el-form-item>

    </el-form>


  </div>
  <component
      is="common-event-component"
      :item="item"
      :eventName="eventNames"
  />
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const emits = defineEmits(["添加事件被选择"]);
const props = defineProps(["item"]);
let sizeOptions = ref([
  { label: "小", value: "small" },
  { label: "中", value: "medium" },
  { label: "大", value: "large" },
]);
let eventNames = ref([
  { label: "数据发生变化", value: "change" },
]);

onMounted(() => {
  if (localStorage.getItem("locale") === "English") {
    sizeOptions.value.forEach((item) => {
      item.label = item.value;
    });
  }
});
</script>
