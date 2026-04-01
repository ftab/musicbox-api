<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2>{{ artist.name }}</h2>
        <p v-if="meta">{{ pluralize(meta.total[0].numRows, 'track') }} in library</p>

        <template v-if="topSharers.length">
            <h3>Top Sharers</h3>

            <section class="list">
                <div v-for="(sharer, index) in topSharers" :key="sharer.nickname" class="list-row">
                    <span class="accent">{{ index + 1 }}.</span>
                    <RouterLink :to="{ name: 'profile', params: { nickname: sharer.nickname } }" :title="sharer.nickname" class="ellipsis">
                        {{ sharer.nickname }}
                    </RouterLink>
                    <span class="dim">{{ pluralize(sharer.trackCount, 'track') }}</span>
                </div>
            </section>
        </template>

        <template v-if="tracks.length">
            <h3>Tracks</h3>

            <section class="list">
                <div v-for="(track, index) in tracks" :key="index" class="list-row">
                    <span class="accent">{{ track.role }}</span>
                    <RouterLink :to="{ name: 'song', params: { id: track.videoId } }" :title="getTrackTitle(track)" class="ellipsis">
                        <ProviderIcons :track="track" />
                        <span>{{ getTrackTitle(track) }}</span>
                    </RouterLink>
                    <span class="dim">{{ pluralize(track.totalPlays, 'relink')}}</span>
                </div>
            </section>
        </template>

        <Pagination v-if="meta && meta.total[0].numRows > meta.perPage" :meta="meta" @pageChange="fetchArtist" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { setPageTitle, pluralize, getTrackTitle } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const isLoading = ref(true);
    const route = useRoute();
    const artist = ref(null);
    const tracks = ref([]);
    const topSharers = ref([]);
    const meta = ref(null);

    const fetchArtist = async (page = (route.query.page || 1)) => {
        isLoading.value = true;

        const artistResponse = await fetch(`/api/artist/${route.params.id}?page=${page}&limit=50`);
        const artistJson = await artistResponse.json();

        artist.value = artistJson.artist;
        tracks.value = artistJson.tracks.data;
        meta.value = artistJson.tracks.meta;
        topSharers.value = artistJson.topSharers;

        isLoading.value = false;

        setPageTitle(artist.value.name);
    };

    onMounted(fetchArtist);
</script>
