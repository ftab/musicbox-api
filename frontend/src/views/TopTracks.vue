<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>Top Tracks</h2>
        <p>Most added songs across all users</p>

        <section class="list">
            <div v-for="(track, index) in data" :key="index" :data-flagged="track.isFlagged" class="list-row">
                <div class="accent">{{ calculateRank(index, meta) }}.</div>
                <div class="ellipsis">
                    <a :href="formatProviderUrl(track)" :title="getTrackTitle(track)" target="_blank">
                        <ProviderIcons :track="track" />
                        <span v-text="getTrackTitle(track)"></span>
                    </a>
                </div>
                <div class="dim">{{ pluralize(track.totalPlays, 'relink') }}</div>
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
