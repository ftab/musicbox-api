import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import { setRoute } from './setup';
import Search from '../../frontend/src/views/Search.vue';
import { search } from './mocks/search';

let wrapper, html;

beforeEach(async () => {
    setRoute({
        path: 'search',
        query: { searchTerm: search.data[0].title },
    });

    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(search) });

    wrapper = mount(Search);

    await flushPromises();

    html = wrapper.html();
});

it('shows search results', async () => {
    expect(html).toContain('Search');
    search.data.forEach(song => {
        expect(html).toContain(song.title);
    });
});
