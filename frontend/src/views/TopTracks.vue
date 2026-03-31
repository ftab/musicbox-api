<template>
    <Spinner v-if="isLoading" />

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

        <Pagination v-if="meta && meta.total[0].numRows > meta.perPage" :meta="meta" @pageChange="fetchTopTracks" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { formatProviderUrl, getTrackTitle, pluralize } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        initialPage: {
            type: Number,
            default: 1,
        }
    });

    const isLoading = ref(false);
    const topTracks = ref([]);
    const meta = ref(null);

    const calculateRank = (index, meta) => {
        const pageNum = parseInt(meta.page, 10) || 1;
        return (pageNum - 1) * meta.perPage + index + 1;
    };

    const fetchTopTracks = async (page = props.initialPage) => {
        isLoading.value = true;

        const topTracksResponse = await fetch(`/api/tracks/top?page=${page}&limit=50`);
        const topTracksJson = await topTracksResponse.json();

        topTracks.value = topTracksJson.data;
        meta.value = topTracksJson.meta;

        isLoading.value = false;
    };

    onMounted(fetchTopTracks);
</script>
