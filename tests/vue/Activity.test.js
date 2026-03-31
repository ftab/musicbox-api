import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import VueAwesomePaginate from 'vue-awesome-paginate';
import Activity from '../../frontend/src/views/Activity.vue';
import { activity } from './mocks/activity';

let wrapper, html;

beforeEach(async () => {
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(activity) });

    wrapper = mount(Activity, {
        global: { plugins: [VueAwesomePaginate] }
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows recently added songs', async () => {
    activity.data.forEach(song => {
        expect(html).toContain(song.nickname);
        expect(html).toContain(song.title);
        expect(html).toContain(new Date(song.lastPlayedTimestamp).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }));
    });
});
