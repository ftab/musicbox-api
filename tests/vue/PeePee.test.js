import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import { peepee } from './mocks/leaderboard';
import PeePee from '../../frontend/src/views/PeePee.vue';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(peepee);

    wrapper = mount(PeePee);

    await flushPromises();

    html = wrapper.html();
});

it('shows users', async () => {
    peepee.data.forEach(user => {
        expect(html).toContain(user.nickname);
        expect(html).toContain(user.pp_score);
    });
});
