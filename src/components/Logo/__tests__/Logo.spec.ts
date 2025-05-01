import { mount } from '@vue/test-utils';
import Logo from '../Logo.vue';
import { vi } from 'vitest';

vi.mock('../assets/neds-logo.svg', () => ({ default: '/mocked-logo-path.svg' }));

describe('Logo.vue', () => {
  it('renders the logo with the correct src and alt attributes', () => {
    const wrapper = mount(Logo);
    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe('/mocked-logo-path.svg');
    expect(img.attributes('alt')).toBe('Neds Logo');
  });

  it('has the correct class applied to the logo', () => {
    const wrapper = mount(Logo);
    const img = wrapper.find('img');

    expect(img.classes()).toContain('logo');
    expect(img.classes()).toContain('vue');
  });
});