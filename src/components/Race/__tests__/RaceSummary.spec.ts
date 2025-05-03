import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRacingStore } from '../../../stores/racingStore/racingStore';
import RaceSummary from '../RaceSummary.vue';
import { vi } from 'vitest';
import { raceCategories } from '../../../utils/utils';

describe('RaceSummary.vue', () => {
  let store: ReturnType<typeof useRacingStore>;
  let pinia: ReturnType<typeof createTestingPinia>;

  beforeEach(() => {
    pinia = createTestingPinia({
      createSpy: vi.fn,
    });

    store = useRacingStore(pinia);
    store.raceSummaries = {
      race1: {
        race_id: 'race1',
        race_name: 'Race 1',
        race_number: 1,
        meeting_name: 'Meeting 1',
        category_id: raceCategories['Greyhound Racing'],
        advertised_start: { seconds: 1000 },
      },
      race2: {
        race_id: 'race2',
        race_name: 'Race 2',
        race_number: 2,
        meeting_name: 'Meeting 2',
        category_id: raceCategories['Harness Racing'],
        advertised_start: { seconds: 2000 },
      },
      race3: {
        race_id: 'race2',
        race_name: 'Race 2',
        race_number: 2,
        meeting_name: 'Meeting 2',
        category_id: raceCategories['Horse Racing'],
        advertised_start: { seconds: 3000 },
      },
    };

    store.selectedCategories = Object.values(raceCategories);
  });

  it('renders all three types of races when all categories are selected', () => {
    const wrapper = mount(RaceSummary, {
      global: {
        plugins: [pinia]
      },
    });

    const raceCards = wrapper.findAll('.race-card');
    expect(raceCards.length).toBe(3);

    // Get all category IDs from the rendered races
    const renderedCategoryIds = raceCards.map(card => card.attributes('data-category-id'));

    // Verify each expected category ID is present
    Object.values(raceCategories).forEach(categoryId => {
      expect(renderedCategoryIds).toContain(categoryId);
    });
  });

  it('displays races with correct category IDs', () => {
    const wrapper = mount(RaceSummary, {
      global: {
        plugins: [pinia]
      },
    });

    const raceCards = wrapper.findAll('.race-card');
    
    // Check each race has the correct category_id
    expect(raceCards[0].attributes('data-category-id')).toBe(raceCategories['Greyhound Racing']);
    expect(raceCards[1].attributes('data-category-id')).toBe(raceCategories['Harness Racing']);
    expect(raceCards[2].attributes('data-category-id')).toBe(raceCategories['Horse Racing']);
  });
});
