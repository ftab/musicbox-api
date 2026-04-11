import { mount, flushPromises } from '@vue/test-utils';
import { beforeEach, it, expect } from 'vitest';
import Song from '../../frontend/src/views/Song.vue';
import { song } from './mocks/song';
import { mockFetch } from './setup';

let wrapper, html;

beforeEach(async () => {
    mockFetch(song);

    wrapper = mount(Song);

    await flushPromises();

    html = wrapper.html();
});

it('shows a song', async () => {
    expect(html).toContain(song.song.title);
    expect(html).toContain(song.song.youtubeChannelName);
});

it('shows artists of a song', async () => {
    song.artists.forEach(artist => {
        expect(html).toContain(`${artist.name} (${artist.role})`);
    });
});

it('shows tags of a song', async () => {
    song.song.tags.split(', ').forEach(tag => {
        expect(html).toContain(tag);
    });
});

it('shows sharers of a song', async () => {
    song.sharedBy.forEach(sharer => {
        expect(html).toContain(sharer.nickname);
        expect(html).toContain(`${sharer.playCount} relinks`);
    });
});

it('shows more songs from this artist', async () => {
    song.moreTracks.forEach(track => {
        expect(html).toContain(track.artistName);
        expect(html).toContain(track.title);
    });
});
