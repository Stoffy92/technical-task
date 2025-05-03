import type { RaceSummary } from '../api/raceService/types';

export const calculateRemainingTime = (seconds: number, currentTime: number): string => {
  const remaining = seconds - currentTime;

  if (remaining <= 0) return 'Race started';

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  return `${hours}h ${minutes}m ${secs}s`;
};

export const filterRacesByCategory = (
  raceSummaries: Record<string, RaceSummary>,
  categoryIds: string[]
): RaceSummary[] => {
  const races = Object.values(raceSummaries);
  
  const filteredRaces = races.filter((race) => {
    const isIncluded = categoryIds.includes(race.category_id);
    return isIncluded;
  });
  
  return filteredRaces;
};

export const API_BASE_URL = 'https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10';
export const numberOfRacesToShow = 5;
export const raceCategories = {
    "Greyhound Racing": '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    "Harness Racing": '161d9be2-e909-4326-8c2c-35ed71fb460b',
    "Horse Racing": '4a2788f8-e825-4d36-9894-efd4baf1cfae',
  };
