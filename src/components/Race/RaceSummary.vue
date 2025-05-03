<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useRacingStore } from '../../stores/racingStore/racingStore';
import { calculateRemainingTime, filterRacesByCategory, numberOfRacesToShow } from '../../utils/utils';
import { categoryList } from './utils';
import type { RaceSummary } from '../../api/raceService/types';

const store = useRacingStore();

const currentTime = ref(Math.floor(Date.now() / 1000));

const filteredRaces = computed<RaceSummary[]>(() => {
  return filterRacesByCategory(store.raceSummaries, store.selectedCategories).slice(0, numberOfRacesToShow);
});

const interval = setInterval(() => {
    currentTime.value = Math.floor(Date.now() / 1000);
}, 1000);

const categoryIcons = Object.fromEntries(categoryList.map((category) => [category.categoryId, category.icon]));


onUnmounted(() => {
    clearInterval(interval);
});

</script>

<template>
  <div>
    <ul class="race-grid">
      <li v-for="(race, index) in filteredRaces" :key="race.race_id" class="race-card" :data-race="race as RaceSummary">
        <div class="header">
          <div class="row">
            <img :src="categoryIcons[race.category_id]" alt="Category Icon" class="race-icon" />
            <p>{{ calculateRemainingTime(race.advertised_start.seconds, currentTime) }}</p>
          </div>
          <div class="row">
            <p class="uppercase"> {{ race.race_name }}</p>
            <p>R{{ race.race_number }}</p>
          </div>
        </div>
        <p class="meeting-name">{{ race.meeting_name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.header {
  border-bottom: 3px solid #ddd;
}

.meeting-name {
  font-size: 0.8rem;
  color: #f55d05;
  font-weight: bold;
  margin-top: 0.5rem;
  text-align: center;
  padding: 0.5rem 0;
} 

.uppercase {
  text-transform: uppercase;
  font-weight: bold;
  color: #3c4a57;
  font-size: 1rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.race-icon {
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.5rem;
}

.race-grid {
  display: grid;
  list-style: none;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(3, 1fr); 
  gap: 1rem; 
}

.race-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>