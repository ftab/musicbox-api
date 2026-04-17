import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import VueAwesomePaginate from 'vue-awesome-paginate'
import Artists from '../../frontend/src/views/Artists.vue';
import { artists } from '../mocks/artists';
import { mockFetch, setRoute } from './setup';

let wrapper, html;

beforeEach(async () => {
    setRoute({ query: { filter: 'A' }});
    mockFetch(artists);

    wrapper = mount(Artists, {
        global: { plugins: [VueAwesomePaginate] },
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows artists', async () => {
    expect(html).toContain('Artists');

    artists.data.forEach(artist => {
        expect(html).toContain(artist.name);
        expect(html).toContain(artist.video_count);
    });
});
