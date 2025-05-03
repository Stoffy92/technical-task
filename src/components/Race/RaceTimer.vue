<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue';
import { calculateRemainingTime } from '../../utils/utils';

const props = defineProps<{
  startTime: number;
}>();

const currentTime = ref(Math.floor(Date.now() / 1000));

const interval = setInterval(() => {
  currentTime.value = Math.floor(Date.now() / 1000);
}, 1000);

const remainingTime = computed(() => {
  const time = calculateRemainingTime(props.startTime, currentTime.value);
  return time === 'Race started' ? null : time;
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <p v-if="remainingTime">{{ remainingTime }}</p>
  <p v-else>Race started</p>
</template> 