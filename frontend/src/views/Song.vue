<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2 :data-flagged="data.song.isFlagged">{{ getTrackTitle(data.song) }}</h2>
        <p>
            <a :href="formatProviderUrl(data.song)" target="_blank">
                <ProviderIcons :track="data.song" :labels="true" />
            </a>
            <span v-if="data.song.youtubeChannelName" class="dim"> · {{ data.song.youtubeChannelName }}</span>
        </p>

        <template v-if="data.artists.length">
            <h3>Artists</h3>

            <ul>
                <li v-for="(artist, index) in data.artists" :key="artist.artistId">
                    <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name">
                        {{ artist.name }} ({{ artist.role }})
                    </RouterLink>
                </li>
            </ul>
        </template>

        <template v-if="data.song.tags">
            <h3>Tags</h3>

            <ul class="tag-list">
                <li v-for="(tag, index) in data.song.tags.split(', ')" :key="tag" v-text="tag"></li>
            </ul>
        </template>

        <template v-if="data.sharedBy.length">
            <h3>Shared by</h3>

            <section class="list">
                <div v-for="(user, index) in data.sharedBy" :key="user.nickname" class="list-row">
                    <div class="accent">{{ index + 1 }}.</div>
                    <div class="ellipsis">
                        <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname">
                            {{ user.nickname }}
                        </RouterLink>
                    </div>
                    <div class="dim">
                        {{ pluralize(user.playCount, 'relink') }}
                        {{ formatTimestamp(user.lastPlayedTimestamp) }}
                    </div>
                </div>
            </section>
        </template>

        <template v-if="data.moreTracks.length">
            <h3>More from this artist</h3>

            <section class="list">
                <div v-for="(track, index) in data.moreTracks" :key="track.videoId" class="list-row">
                    <span v-if="track.artistName" class="accent">{{ track.artistName }}</span>
                    <RouterLink :to="{ name: 'song', params: { id: track.videoId } }" :title="getTrackTitle(track)" class="ellipsis">
                        <ProviderIcons :track="track" />
                        <span>{{ getTrackTitle(track) }}</span>
                    </RouterLink>
                </div>
            </section>
        </template>
    </template>
</template>

<script setup>
    import { watch } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { setPageTitle, pluralize, getTrackTitle, formatProviderUrl, formatTimestamp } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        id: {
            type: String,
            required: true,
        },
    });

    const { data, loading, get } = useFetch();

    const getSong = async () => {
        await get('/api/song/:id', { params: { id: props.id } });

        if( ! data.value) return;

        setPageTitle(getTrackTitle(data.value.song));
    };

    watch(() => props.id, () => getSong(), { immediate: true });
</script>
