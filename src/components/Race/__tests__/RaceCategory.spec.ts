import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useRacingStore } from '../../../stores/racingStore/racingStore';
import RaceCategory from '../RaceCategory.vue';
import { beforeEach, describe, expect, it, vi } from 'vitest'; 
import { categoryList } from '../utils'; 

describe('RaceCategory.vue', () => {
  let store: ReturnType<typeof useRacingStore>;

  beforeEach(() => {
    const pinia = createTestingPinia({
      createSpy: vi.fn
    });
    store = useRacingStore(pinia);
    store.setSelectedCategories = vi.fn();

    store.selectedCategories = [...categoryList.map((category) => category.categoryId)];
  });

  it('renders all categories with checkboxes', () => {
    const wrapper = mount(RaceCategory, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(categoryList.length);
    categoryList.forEach((category, index) => {
      const checkbox = checkboxes[index].element as HTMLInputElement;
      expect(checkbox.value).toBe(category.categoryId);
      expect(checkbox.checked).toBe(true);
    });
  });


  it('displays the correct icons and labels', () => {
    const wrapper = mount(RaceCategory, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const labels = wrapper.findAll('.label-container');
    categoryList.forEach((category, index) => {
      const label = labels[index];
      const img = label.find('img');
      expect(label.text()).toContain(category.label);
      expect(img.attributes('src')).toBe(category.icon);
    });
  });
});