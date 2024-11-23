<template>
  <div :style="spacerStyle" class="spacer-component"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    width?: number | string
    height?: number | string,
    bgColor?: string
  }>(),
  {
    width: 100,
    height: 20
  }
)

const spacerStyle = computed(() => ({
  width: `${props.width}%`,
  height: `${props.height}px`,
  backgroundColor: props.bgColor ? props.bgColor : getComputedStyle(document.documentElement).getPropertyValue('--color-background')
}))
</script>

<style scoped>
.spacer-component {}
</style>
