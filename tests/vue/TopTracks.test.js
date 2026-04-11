import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import VueAwesomePaginate from 'vue-awesome-paginate'
import TopTracks from '../../frontend/src/views/TopTracks.vue';
import { videos } from './mocks/videos';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(videos);

    wrapper = mount(TopTracks, {
        global: { plugins: [VueAwesomePaginate] },
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows top tracks', async () => {
    expect(html).toContain('Top Tracks');
    expect(html).toContain('Most added songs across all users');

    videos.data.forEach(video => {
        expect(html).toContain(video.title);
        expect(html).toContain(`${video.totalPlays} relinks`);
    });
});
