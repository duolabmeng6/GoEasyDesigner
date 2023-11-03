<template>
  <div class="属性表格">
    <el-form
        label-position="left"
        label-width="100px"
        style="max-width: 460px"
    >
      <component is="common-properties" :item="item" />
      <el-form-item label="text">
        <el-input v-model="props.item.text" />
      </el-form-item>
      <el-form-item label="default">
        <el-input v-model="props.item.default" />
      </el-form-item>
      <el-form-item label="download">
        <el-input v-model="item.download" />
      </el-form-item>
      <el-form-item label="hover">
        <el-input v-model="item.hover" />
      </el-form-item>
      <el-form-item label="href">
        <el-input v-model="item.href" />
      </el-form-item>
      <el-form-item label="prefixIcon">
        <el-input v-model="item.prefixIcon" />
      </el-form-item>
      <el-form-item label="size">
        <el-select v-model="props.item.size" style="width: 100%">
          <el-option
              v-for="(item, index) in sizeOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="suffixIcon">
        <el-input v-model="item.suffixIcon" />
      </el-form-item>
      <el-form-item label="target">
        <el-input v-model="item.target" />
      </el-form-item>
      <el-form-item label="theme">
        <el-select v-model="props.item.theme" style="width: 100%">
          <el-option
              v-for="(item, index) in themeOptions"
              :key="item"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="underline">
        <el-switch v-model="item.underline" />
      </el-form-item>
    </el-form>

    <component
        is="common-event-component"
        :item="props.item"
        :eventName="enventNames"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const emits = defineEmits(["添加事件被选择"]);
const props = defineProps(["item"]);
let sizeOptions = ref([
  { label: "更小", value: "extra-small" },
  { label: "小", value: "small" },
  { label: "中", value: "medium" },
  { label: "大", value: "large" },
]);
let themeOptions = ref([
  { label: "默认", value: "default" },
  { label: "主要", value: "primary" },
  { label: "危险", value: "danger" },
  { label: "警告", value: "warning" },
  { label: "成功", value: "success" },
]);
let enventNames = ref([
  { label: "点击事件", value: "click" },
]);

onMounted(() => {
  console.log("LinkButtonPropertiesTable.vue onMounted");
  console.log("--", localStorage.getItem("locale"));

  if (localStorage.getItem("locale") === "English") {
    console.log("英语");
    sizeOptions.value.forEach((item) => {
      item.label = item.value;
    });
    themeOptions.value.forEach((item) => {
      item.label = item.value;
    });
  }
});
</script>
