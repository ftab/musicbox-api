<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>Last activity</h2>
        <p>Recently added songs</p>

        <section class="list">
            <div v-for="(item, index) in activity" :key="index" :data-flagged="item.isFlagged" :title="getTrackTitle(item)" class="list-row">
                <span class="accent">{{ item.nickname }}</span>
                <a :href="formatProviderUrl(item)" :title="getTrackTitle(item)" target="_blank" class="ellipsis">
                    <ProviderIcons :track="item" />
                    <span v-text="getTrackTitle(item)"></span>
                </a>
                <span class="dim">{{ formatTimestamp(item.lastPlayedTimestamp) }}</span>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getActivity" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFetch } from '../composables/useFetch';
    import { formatTimestamp, formatProviderUrl, getTrackTitle } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const route = useRoute();
    const { data: activity, meta, loading, get } = useFetch();

    const getActivity = async (page = (route.query.page || 1)) => {
        await get(`/api/activity?page=${encodeURIComponent(page)}&limit=50`);
    }

    onMounted(getActivity);
</script>
