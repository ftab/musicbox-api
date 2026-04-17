import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import VueAwesomePaginate from 'vue-awesome-paginate'
import Artist from '../../frontend/src/views/Artist.vue';
import { artist } from '../mocks/artist';
import { setRoute, mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    setRoute({ params: { id: '1' } });
    mockFetch(artist);

    wrapper = mount(Artist, {
        global: { plugins: [VueAwesomePaginate] },
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows an artist', async () => {
    expect(html).toContain(artist.artist.name);
});

it('shows how many tracks of this artist are in the library', async () => {
    expect(html).toContain(`${artist.tracks.meta.total[0].numRows} tracks in library`);
});

it('shows the top sharers', async () => {
    artist.topSharers.forEach(sharer => {
        expect(html).toContain(sharer.nickname);
        expect(html).toContain(`${sharer.trackCount} tracks`);
    });
});

it('shows tracks of this artist', async () => {
    artist.tracks.data.forEach(track => {
        expect(html).toContain(track.role);
        expect(html).toContain(track.title);
        expect(html).toContain(`${track.totalPlays} relinks`);
    });
});
