import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import { setRoute } from './setup';
import Search from '../../frontend/src/views/Search.vue';
import { search } from '../mocks/search';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(search);

    wrapper = mount(Search, {
        props: { searchTerm: search.data[0].title },
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows search results', async () => {
    expect(html).toContain('Search');
    expect(html).toContain(`Found 1 song matching "${search.data[0].title}"`);
    search.data.forEach(song => {
        expect(html).toContain(song.title);
    });
});
