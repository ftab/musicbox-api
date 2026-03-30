import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Home from '../../frontend/src/views/Home.vue';

it('shows a top 50 leaderboard', async () => {
    global.fetch = vi.fn()
        .mockResolvedValueOnce({
            json: () => Promise.resolve({ data: 72150 }),
        })
        .mockResolvedValueOnce({
            json: () => Promise.resolve({
                data: [
                    { nickname: 'Rae', video_count: 9978 },
                    { nickname: 'keypusher', video_count: 7321 },
                    { nickname: 'fury', video_count: 6830 },
                ]
            }),
        });

    const wrapper = mount(Home);

    await flushPromises();

    [
        'Top 50 Contributors',
        '72150 unique songs collected',
        '1.Rae9978 songs',
        '2.keypusher7321 songs',
        '3.fury6830 songs',
    ].every(val => expect(wrapper.text()).toContain(val));
});
