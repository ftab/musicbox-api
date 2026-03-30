import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router'
import VueAwesomePaginate from 'vue-awesome-paginate'
import Activity from '../../frontend/src/views/Activity.vue';

it('shows a top tracks list', async () => {
    global.fetch = vi.fn()
        .mockResolvedValueOnce({
            json: () => Promise.resolve({
                data: [
                    {
                        'nickname': 'keypusher',
                        'videoId': 72155,
                        'title': 'Launch Code to the Nuclear Payload, by Heavy Metal Shrapnel',
                        'youtubeId': null,
                        'soundcloudId': null,
                        'soundcloudUrl': null,
                        'vimeoId': null,
                        'bandcampId': 'heavymetalshrapnel;launch-code-to-the-nuclear-payload',
                        'isFlagged': 0,
                        'lastPlayedTimestamp': '2026-03-13T20:26:27.000Z'
                    },
                    {
                        'nickname': 'fury',
                        'videoId': 72154,
                        'title': 'Mike Posner - I Went Back To Ibiza (Official Lyric Video)',
                        'youtubeId': 'UDL6SEW4xKU',
                        'soundcloudId': null,
                        'soundcloudUrl': null,
                        'vimeoId': null,
                        'bandcampId': null,
                        'isFlagged': 0,
                        'lastPlayedTimestamp': '2026-03-08T11:57:33.000Z'
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

    const wrapper = mount(Activity, {
        global: { plugins: [router, VueAwesomePaginate] }
    });

    await flushPromises();

    [
        'Last activity',
        'Recently added songs',
        'keypusher',
        'Launch Code to the Nuclear Payload, by Heavy Metal Shrapnel',
        'fury',
        'Mike Posner - I Went Back To Ibiza (Official Lyric Video)',
    ].every(val => expect(wrapper.text()).toContain(val));
});
