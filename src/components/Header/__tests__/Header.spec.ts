import { mount } from '@vue/test-utils';
import Header from '../Header.vue';
import Logo from '../../Logo/Logo.vue';

describe('Header.vue', () => {
  it('renders the header with the Logo component', () => {
    const wrapper = mount(Header);
    const header = wrapper.find('header');

    expect(wrapper.findComponent(Logo).exists()).toBe(true);
    expect(header.classes()).toContain('header');
  });

});