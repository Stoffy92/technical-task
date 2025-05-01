import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getNextRaces } from '../../api/raceService/getNextRaces';
import { raceCategories } from '../../utils/utils';
import type { RacesResponse, RaceSummary } from '../../api/raceService/types';

export const useRacingStore = defineStore('racing', () => {
  const nextToGoIds = ref<string[]>([]);
  const raceSummaries = ref<Record<string, RaceSummary>>({});
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const selectedCategories = ref<string[]>(Object.values(raceCategories)); 

  const setSelectedCategories = (categories: string[]) => {
    selectedCategories.value = categories;
  };

  const fetchNextToGoRaces = async () => {
    loading.value = true;
    try {
      const races = await getNextRaces() as RacesResponse; 
      nextToGoIds.value = races.data.next_to_go_ids; 
      raceSummaries.value = races.data.race_summaries;

    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  
  return {
    nextToGoIds,
    raceSummaries,
    selectedCategories,
    loading,
    error,
    fetchNextToGoRaces,
    setSelectedCategories,
  };
});
