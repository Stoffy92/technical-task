<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { calculateRemainingTime } from '../../utils/utils';

const props = defineProps<{
  startTime: number;
}>();

const currentTime = ref(Math.floor(Date.now() / 1000));

const interval = setInterval(() => {
  currentTime.value = Math.floor(Date.now() / 1000);
}, 1000);

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <p>{{ calculateRemainingTime(startTime, currentTime) }}</p>
</template> 