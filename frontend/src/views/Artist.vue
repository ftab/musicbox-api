<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>{{ data.artist.name }}</h2>
        <p v-if="data.tracks.meta">{{ pluralize(data.tracks.meta.total[0].numRows, 'track') }} in library</p>

        <template v-if="data.topSharers.length">
            <h3>Top Sharers</h3>

            <section class="list">
                <div v-for="(sharer, index) in data.topSharers" :key="sharer.nickname" class="list-row">
                    <span class="accent">{{ index + 1 }}.</span>
                    <RouterLink :to="{ name: 'profile', params: { nickname: sharer.nickname } }" :title="sharer.nickname" class="ellipsis">
                        {{ sharer.nickname }}
                    </RouterLink>
                    <span class="dim">{{ pluralize(sharer.trackCount, 'track') }}</span>
                </div>
            </section>
        </template>

        <template v-if="data.tracks.data.length">
            <h3>Tracks</h3>

            <section class="list">
                <div v-for="(track, index) in data.tracks.data" :key="index" class="list-row">
                    <span class="accent">{{ track.role }}</span>
                    <RouterLink :to="{ name: 'song', params: { id: track.videoId } }" :title="getTrackTitle(track)" class="ellipsis">
                        <ProviderIcons :track="track" />
                        <span>{{ getTrackTitle(track) }}</span>
                    </RouterLink>
                    <span class="dim">{{ pluralize(track.totalPlays, 'relink')}}</span>
                </div>
            </section>
        </template>

        <Pagination :meta="data.tracks.meta" @pageChange="getArtist" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFetch } from '../composables/useFetch';
    import { setPageTitle, pluralize, getTrackTitle } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const route = useRoute();
    const { data, loading, get } = useFetch();

    const getArtist = async (page = (route.query.page || 1)) => {
        await get(`/api/artist/${encodeURIComponent(route.params.id)}?page=${encodeURIComponent(page)}&limit=50`);

        if( ! data.value) return;

        setPageTitle(data.value.artist.name);
    };

    onMounted(getArtist);
</script>
