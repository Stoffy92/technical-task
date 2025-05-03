import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRacingStore } from '../../../stores/racingStore/racingStore';
import RaceContainer from '../RaceContainer.vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('RaceContainer.vue', () => {
  let store: ReturnType<typeof useRacingStore>;

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    });
    store = useRacingStore(pinia);

    store.fetchNextToGoRaces = vi.fn();
  });

  it('renders RaceCategory and RaceSummary components', () => {
    const wrapper = mount(RaceContainer, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.findComponent({ name: 'RaceCategory' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'RaceSummary' }).exists()).toBe(true);
  });

});