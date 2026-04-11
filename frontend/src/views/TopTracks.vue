<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>Top Tracks</h2>
        <p>Most added songs across all users</p>

        <section class="list">
            <div v-for="(track, index) in topTracks" :key="index" :data-flagged="track.isFlagged" class="list-row">
                <span class="accent">{{ calculateRank(index, meta) }}.</span>
                <a :href="formatProviderUrl(track)" :title="getTrackTitle(track)" target="_blank" class="ellipsis">
                    <ProviderIcons :track="track" />
                    <span v-text="getTrackTitle(track)"></span>
                </a>
                <span class="dim">{{ pluralize(track.totalPlays, 'relink') }}</span>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getTopTracks" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFetch } from '../composables/useFetch';
    import { formatProviderUrl, getTrackTitle, pluralize } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const route = useRoute();
    const { data: topTracks, meta, loading, get } = useFetch();

    const calculateRank = (index, meta) => {
        const pageNum = parseInt(meta.page, 10) || 1;
        return (pageNum - 1) * meta.perPage + index + 1;
    };

    const getTopTracks = async (page = (route.query.page || 1)) => {
        await get(`/api/tracks/top?page=${encodeURIComponent(page)}&limit=50`);
    };

    onMounted(getTopTracks);
</script>
