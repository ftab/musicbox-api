import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import { stats } from './mocks/stats';
import { leaderboard } from './mocks/leaderboard';
import Home from '../../frontend/src/views/Home.vue';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(stats);
    mockFetch(leaderboard);

    wrapper = mount(Home);

    await flushPromises();

    html = wrapper.html();
});

it('shows total songs collected', async () => {
    expect(html).toContain('Top 50 Contributors');
    expect(html).toContain(`${stats.totalSongs} unique songs collected`);
});

it('shows users', async () => {
    leaderboard.data.forEach(user => {
        expect(html).toContain(user.nickname);
        expect(html).toContain(user.video_count);
    });
});
