<script setup lang="ts">
import { onMounted } from 'vue';
import { useRacingStore } from '../../stores/racingStore/racingStore';
import RaceSummary from './RaceSummary.vue';
import RaceCategory from './RaceCategory.vue';
const store = useRacingStore();

onMounted(() => {
  store.fetchNextToGoRaces();
});

</script>

<template>
  <RaceCategory />
  <RaceSummary />
</template>