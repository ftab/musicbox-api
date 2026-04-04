import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import Search from '../../frontend/src/views/Search.vue';
import { search } from './mocks/search';

let wrapper, html;

beforeEach(async () => {
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
