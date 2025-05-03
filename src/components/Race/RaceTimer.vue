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
  <p v-if="remainingTime" class="timer">{{ remainingTime }}</p>
  <div v-else class="race-started">Race started</div>
</template>

<style scoped>
.timer {
  color: #3c4a57;
  font-weight: bold;
}

.race-started {
  background-color: #4CAF50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}
</style> 