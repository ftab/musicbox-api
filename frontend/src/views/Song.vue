<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2 :data-flagged="song.isFlagged">{{ getTrackTitle(song) }}</h2>
        <p>
            <a :href="formatProviderUrl(song)" target="_blank">
                <ProviderIcons :track="song" :labels="true" />
            </a>
            <span v-if="song.youtubeChannelName" class="dim"> · {{ song.youtubeChannelName }}</span>
        </p>

        <template v-if="artists.length">
            <h3>Artists</h3>

            <ul>
                <li v-for="(artist, index) in artists" :key="artist.artistId">
                    <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name">
                        {{ artist.name }} ({{ artist.role }})
                    </RouterLink>
                </li>
            </ul>
        </template>

        <template v-if="song.tags">
            <h3>Tags</h3>

            <ul class="tag-list">
                <li v-for="(tag, index) in song.tags.split(', ')" :key="tag" v-text="tag"></li>
            </ul>
        </template>

        <template v-if="sharedBy.length">
            <h3>Shared by</h3>

            <section class="list">
                <div v-for="(user, index) in sharedBy" :key="user.nickname" class="list-row">
                    <span class="accent">{{ index + 1 }}.</span>
                    <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname" class="nickname ellipsis">
                        {{ user.nickname }}
                    </RouterLink>
                    <span class="dim">
                        {{ pluralize(user.playCount, 'relink') }}
                        {{ formatTimestamp(user.lastPlayedTimestamp) }}
                    </span>
                </div>
            </section>
        </template>

        <template v-if="moreTracks.length">
            <h3>More from this artist</h3>

            <section class="list">
                <div v-for="(track, index) in moreTracks" :key="track.videoId" class="list-row">
                    <span v-if="track.artistName" class="ellipsis accent">{{ track.artistName }}</span>
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
    import { onMounted, ref } from 'vue';
    import { useRoute, onBeforeRouteUpdate } from 'vue-router';
    import { setPageTitle, pluralize, getTrackTitle, formatProviderUrl, formatTimestamp } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Spinner from '../components/Spinner.vue';

    const isLoading = ref(true);
    const route = useRoute();
    const song = ref(null);
    const artists = ref([]);
    const sharedBy = ref([]);
    const moreTracks = ref([]);

    const fetchSong = async (id = route.params.id) => {
        isLoading.value = true;

        const songResponse = await fetch(`/api/song/${id}`);
        const songJson = await songResponse.json();

        song.value = songJson.song;
        artists.value = songJson.artists;
        sharedBy.value = songJson.sharedBy;
        moreTracks.value = songJson.moreTracks;

        isLoading.value = false;

        setPageTitle(getTrackTitle(song.value));
    };

    onBeforeRouteUpdate(to => fetchSong(to.params.id));

    onMounted(fetchSong);
</script>
