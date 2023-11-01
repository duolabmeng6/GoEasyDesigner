<script setup>
import TreeSelectBox from "./TreeSelectBox.vue";
import PropertyTable from "./PropertyTable.vue";
import {defineProps} from "vue";
const props = defineProps(['store']);

</script>
<template>
  <div style="display: grid;
        height: 100%;
        grid-template-areas: 's-top'
        's-main'
        's-bottom';
        grid-template-rows: auto 8fr auto;
        overflow: auto;
        gap: 8px;
        padding: 8px;
      ">
    <div style="
    grid-area: s-top;"
    >
      <TreeSelectBox :store="props.store"/>
    </div>
    <div style="grid-area: s-main;
        overflow: auto;">
      <PropertyTable :store="props.store"/>
    </div>
    <div id="事件选择器" style="grid-area: s-bottom;">

    </div>
  </div>
</template>