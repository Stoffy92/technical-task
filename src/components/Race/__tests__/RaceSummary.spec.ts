import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRacingStore } from '../../../stores/racingStore/racingStore';
import RaceSummary from '../RaceSummary.vue';
import { vi } from 'vitest';

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
        category_id: 'cat1',
        advertised_start: { seconds: 1000 },
      },
      race2: {
        race_id: 'race2',
        race_name: 'Race 2',
        race_number: 2,
        meeting_name: 'Meeting 2',
        category_id: 'cat2',
        advertised_start: { seconds: 2000 },
      },
    };

    store.selectedCategories = ['cat1', 'cat2'];
  });

  it('renders the correct number of races', () => {
    const wrapper = mount(RaceSummary, {
      global: {
        plugins: [pinia]
      },
    });

    const raceCards = wrapper.findAll('.race-card');
    expect(raceCards.length).toBe(2);
  });

  it('displays race details correctly', () => {
    const wrapper = mount(RaceSummary, {
      global: {
        plugins: [pinia]
      },
    });

    const raceCards = wrapper.findAll('.race-card');
    expect(raceCards[0].text()).toContain('Race 1');
    expect(raceCards[0].text()).toContain('Meeting 1');
    expect(raceCards[0].text()).toContain('R1');

    expect(raceCards[1].text()).toContain('Race 2');
    expect(raceCards[1].text()).toContain('Meeting 2');
    expect(raceCards[1].text()).toContain('R2');
  });

  it('filters races based on selected categories', () => {
    store.selectedCategories = ['cat1'];

    const wrapper = mount(RaceSummary, {
      global: {
        plugins: [pinia],
      },
    });

    const raceCards = wrapper.findAll('.race-card');
    expect(raceCards.length).toBe(1);
    expect(raceCards[0].text()).toContain('Race 1');
  });
});
