import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router'
import VueAwesomePaginate from 'vue-awesome-paginate'
import TopTracks from '../../frontend/src/views/TopTracks.vue';

it('shows a top tracks list', async () => {
    global.fetch = vi.fn()
        .mockResolvedValueOnce({
            json: () => Promise.resolve({
                data: [
                    {
                      "videoId": 15774,
                      "title": 'BT and Adam K - "Tomahawk (K_Master Edit)"',
                      "youtubeId": 'u_hE4rNpiQE',
                      "soundcloudId": null,
                      "soundcloudUrl": null,
                      "vimeoId": null,
                      "bandcampId": null,
                      "isFlagged": 0,
                      "totalPlays": '66'
                    },
                    {
                      "videoId": 35529,
                      "title": 'GETTER - BLOOD HARVEST',
                      "youtubeId": 'ZlJjB2NOhj8',
                      "soundcloudId": null,
                      "soundcloudUrl": null,
                      "vimeoId": null,
                      "bandcampId": null,
                      "isFlagged": 0,
                      "totalPlays": '52'
                    },
                ],
                meta: {
                    page: 1,
                    total: [
                        { numRows: 2 },
                    ],
                    perPage: 50,
                },
            }),
        });

    const router = createRouter({
        history: createWebHistory(),
        routes: [{ path: '/', component: {} }],
    });

    const wrapper = mount(TopTracks, {
        global: { plugins: [router, VueAwesomePaginate] }
    });

    await flushPromises();

    [
        'Top Tracks',
        'Most added songs across all users',
        '1.',
        'BT and Adam K - "Tomahawk (K_Master Edit)"',
        '66 relinks',
        '2.',
        'GETTER - BLOOD HARVEST',
        '52 relinks',
    ].every(val => expect(wrapper.text()).toContain(val));
});
