<template>
    <t-progress
        :color="item.color"
        :label="item.label"
        :percentage="item.percentage"
        :size="item.size"
        :status="item.status"
        :strokeWidth="item.strokeWidth"
        :theme="item.theme"
        :trackColor="item.trackColor"
    />
</template>

<script setup>
import { getItemStyle } from "@/public";
import { defineProps, ref } from "vue";

const props = defineProps(['item']);
</script>
