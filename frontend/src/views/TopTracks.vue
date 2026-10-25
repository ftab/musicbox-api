<template>
    <Spinner v-if="loading" />

    <template v-else>
        <header class="page-header">
            <h1>Top Tracks</h1>
            <p>Most added songs across all users</p>
        </header>

        <section class="list">
            <div v-for="(track, index) in data" :key="index" :class="{ 'list-row': true, 'is-flagged': track.isFlagged }">
                <div class="text-accent text-end">{{ calculateRank(index, meta) }}.</div>
                <div class="text-ellipsis">
                    <a :href="formatProviderUrl(track)" :title="getTrackTitle(track)" target="_blank">
                        <ProviderIcons :track="track" />
                        <span v-text="getTrackTitle(track)"></span>
                    </a>
                </div>
                <div class="text-soft">{{ pluralize(track.totalPlays, 'relink') }}</div>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getTopTracks" />
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { formatProviderUrl, getTrackTitle, pluralize, calculateRank } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        page: {
            type: Number,
            required: true,
        },
    });

    const { data, meta, loading, get } = useFetch();

    const getTopTracks = async (page = props.page) => {
        await get('/api/tracks/top', { query: { page, limit: 50 } });
    };

    onMounted(getTopTracks);
</script>
