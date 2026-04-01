<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2>Last activity</h2>
        <p>Recently added songs</p>

        <section class="list">
            <div v-for="(item, index) in activity" :key="index" :data-flagged="item.isFlagged" class="list-row">
                <span class="accent">{{ item.nickname }}</span>
                <a :href="formatProviderUrl(item)" :title="getTrackTitle(item)" target="_blank" class="ellipsis">
                    <ProviderIcons :track="item" />
                    <span v-text="getTrackTitle(item)"></span>
                </a>
                <span class="dim">{{ formatTimestamp(item.lastPlayedTimestamp) }}</span>
            </div>
        </section>

        <Pagination v-if="meta && meta.total[0].numRows > meta.perPage" :meta="meta" @pageChange="fetchActivity" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { formatTimestamp, formatProviderUrl, getTrackTitle } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        initialPage: {
            type: Number,
            default: 1,
        }
    });

    const isLoading = ref(true);
    const activity = ref([]);
    const meta = ref(null);

    const fetchActivity = async (page = props.initialPage) => {
        isLoading.value = true;

        const activityResponse = await fetch(`/api/activity?page=${page}&limit=50`);
        const activityJson = await activityResponse.json();

        activity.value = activityJson.data;
        meta.value = activityJson.meta;

        isLoading.value = false;
    }

    onMounted(fetchActivity);
</script>
