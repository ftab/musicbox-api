import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import VueAwesomePaginate from 'vue-awesome-paginate'
import TopTracks from '../../frontend/src/views/TopTracks.vue';
import { topTracks } from '../mocks/topTracks';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(topTracks);

    wrapper = mount(TopTracks, {
        global: { plugins: [VueAwesomePaginate] },
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows top tracks', async () => {
    expect(html).toContain('Top Tracks');
    expect(html).toContain('Most added songs across all users');

    topTracks.data.forEach(topTrack => {
        expect(html).toContain(topTrack.title);
        expect(html).toContain(`${topTrack.totalPlays} relinks`);
    });
});
