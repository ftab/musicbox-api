<template>
    <Spinner v-if="loading" />

    <template v-else>
        <header class="page-header">
            <h1 :class="{ 'is-flagged':data.song.isFlagged }">{{ getTrackTitle(data.song) }}</h1>
            <p>
                <a :href="formatProviderUrl(data.song)" target="_blank" rel="noopener">
                    <ProviderIcons :track="data.song" :labels="true" />
                </a>
                <span v-if="data.song.youtubeChannelName" class="text-soft"> · {{ data.song.youtubeChannelName }}</span>
            </p>
        </header>

        <template v-if="data.song.tags">
            <ul class="tags">
                <li v-for="(tag, index) in data.song.tags.split(', ')" :key="tag">{{ tag }}</li>
            </ul>
        </template>

        <template v-if="data.artists.length">
            <header class="section-header">
                <h2>Artists</h2>
            </header>

            <ul>
                <li v-for="(artist, index) in data.artists" :key="artist.artistId">
                    <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name">
                        {{ artist.name }} ({{ artist.role }})
                    </RouterLink>
                </li>
            </ul>
        </template>


        <template v-if="data.sharedBy.length">
            <header class="section-header">
                <h2>Shared by</h2>
            </header>

            <section class="list">
                <div v-for="(user, index) in data.sharedBy" :key="user.nickname" class="list-row">
                    <div class="text-accent">{{ index + 1 }}.</div>
                    <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname" class="text-ellipsis">
                        {{ user.nickname }}
                    </RouterLink>
                    <div class="text-soft">
                        {{ pluralize(user.playCount, 'relink') }}
                        {{ formatTimestamp(user.lastPlayedTimestamp) }}
                    </div>
                </div>
            </section>
        </template>

        <template v-if="data.moreTracks.length">
            <header class="section-header">
                <h2>More from this artist</h2>
            </header>

            <section class="list">
                <div v-for="(track, index) in data.moreTracks" :key="track.videoId" class="list-row">
                    <span v-if="track.artistName" class="text-accent">{{ track.artistName }}</span>
                    <RouterLink :to="{ name: 'song', params: { id: track.videoId } }" :title="getTrackTitle(track)" class="text-ellipsis">
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
