<template>
  <svg class="iconfont-js" :style="{ 'font-size': size + 'px' ,'margin-right':distance + 'px'}" aria-hidden="true">
    <use :xlink:href="iconClass"></use>
  </svg>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: ''
  },
  distance: {
    type: String,
    default: '5'
  }
})
const iconClass = computed(() => {
  return `#${props.icon}`;
})
</script>

<style>
.iconfont-js {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
