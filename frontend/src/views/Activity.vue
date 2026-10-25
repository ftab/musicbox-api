<template>
    <Spinner v-if="loading" />

    <template v-else>
        <header class="page-header">
            <h1>Activity</h1>
            <p>Recently added songs</p>
        </header>

        <section class="list">
            <div v-for="(item, index) in data" :key="index" :title="getTrackTitle(item)" :class="{ 'list-row': true, 'is-flagged': item.isFlagged }">
                <div class="text-accent text-ellipsis">{{ item.nickname }}</div>
                <div class="text-ellipsis">
                    <a :href="formatProviderUrl(item)" :title="getTrackTitle(item)" target="_blank">
                        <ProviderIcons :track="item" />
                        <span v-text="getTrackTitle(item)"></span>
                    </a>
                </div>
                <div class="text-soft">{{ formatTimestamp(item.lastPlayedTimestamp) }}</div>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getActivity" />
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { formatTimestamp, formatProviderUrl, getTrackTitle } from '../utils';
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

    const getActivity = async (page = props.page) => {
        await get('/api/activity', { query: { page, limit: 50 } });
    };

    onMounted(getActivity);
</script>
