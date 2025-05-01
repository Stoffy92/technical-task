import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Container from '../Container.vue';
import RaceContainer from '../../Race/RaceContainer.vue';

describe('Container.vue', () => {
  it('renders the container with the RaceContainer component', () => {
    const wrapper = mount(Container, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const container = wrapper.find('.container');

    expect(wrapper.findComponent(RaceContainer).exists()).toBe(true);
    expect(container.exists()).toBe(true);
  });
});
