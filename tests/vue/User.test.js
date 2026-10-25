import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import VueAwesomePaginate from 'vue-awesome-paginate'
import User from '../../frontend/src/views/User.vue';
import { user, videos } from '../mocks/user';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(user);
    mockFetch(videos);

    wrapper = mount(User, {
        global: { plugins: [VueAwesomePaginate] },
        props: { nickname: 'Cuckoo', page: 1 },
    });

    await flushPromises();

    html = wrapper.html();
});

it('shows a users profile', async () => {
    const firstShareDate = new Date(user.stats.firstShared)
        .toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

    expect(html).toContain(user.stats.nickname);
    expect(html).toContain(`${user.stats.uniqueVideos} unique songs · ${user.stats.totalPlays} total relinks · sharing since ${firstShareDate}`);
    expect(html).toContain('Top Artists');
});

it('shows top tags', async () => {
    user.topTags.forEach(tag => {
        expect(html).toContain(tag.name);
        expect(html).toContain(`(${tag.count})`);
    });
});

it('can show top artists', async () => {
    user.topArtists.forEach(artist => {
        expect(html).not.toContain(artist.name);
        expect(html).not.toContain(`${artist.trackCount} tracks`);
    });

    await wrapper
        .findAll('button.custom-select-option')
        .find(button => button.text() === 'Top Artists')
        .trigger('click');

    html = wrapper.html();

    user.topArtists.forEach(artist => {
        expect(html).toContain(artist.name);
        expect(html).toContain(`${artist.trackCount} tracks`);
    });
});
