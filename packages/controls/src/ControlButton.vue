<script lang="ts" setup>
interface Props {
  sizeMultiplier?: number
}

const { sizeMultiplier = 1 } = defineProps<Props>()
</script>

<script lang="ts">
export default {
  name: 'ControlButton',
  compatConfig: { MODE: 3 },
}
</script>

<template>
  <button 
    class="vue-flow__controls-button"
    :style="{
      padding: `${5 * sizeMultiplier}px`,
      width: `${16 * sizeMultiplier}px`,
      height: `${16 * sizeMultiplier}px`,
      fontSize: `${12 * sizeMultiplier}px`,
      '--icon-size': `${12 * sizeMultiplier}px`
    }"
  >
    <slot />
  </button>
</template>
