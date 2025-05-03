import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RaceTimer from '../RaceTimer.vue';

const fiveMinutesInSeconds = 5 * 60;
const oneMinuteInSeconds = 60;
const fiveSeconds = 5;
const oneSecond = 1;

describe('RaceTimer', () => {
  let mockDate: number;

  beforeEach(() => {
    mockDate = Math.floor(Date.now() / 1000);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate * 1000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays remaining time correctly', () => {
    const startTime = mockDate + fiveMinutesInSeconds;
    const wrapper = mount(RaceTimer, {
      props: {
        startTime
      }
    });

    expect(wrapper.text()).toContain('5m');
  });

  it('displays "Race started" when time is up', () => {
    const startTime = mockDate - oneMinuteInSeconds;
    const wrapper = mount(RaceTimer, {
      props: {
        startTime
      }
    });

    expect(wrapper.find('.race-started').exists()).toBe(true);
    expect(wrapper.text()).toBe('Race started');
  });

  it('updates the timer every second', async () => {
    const startTime = mockDate + fiveSeconds;
    const wrapper = mount(RaceTimer, {
      props: {
        startTime
      }
    });

    expect(wrapper.text()).toContain('5s');

    vi.advanceTimersByTime(oneSecond);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('4s');
  });

  it('cleans up interval on unmount', () => {
    const startTime = mockDate + fiveMinutesInSeconds;
    const wrapper = mount(RaceTimer, {
      props: {
        startTime
      }
    });

    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    wrapper.unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
}); 