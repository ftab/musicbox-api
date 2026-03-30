<template>
    <h2>Last activity</h2>
    <p>Recently added songs</p>

    <Pagination v-if="activity.length" :meta="meta" @pageChange="fetchActivity" />

    <section class="list">
        <div v-if="activity.length" v-for="(item, index) in activity" :key="index" class="list-row">
            <span class="accent">{{ item.nickname }}</span>
            <a :href="formatProviderUrl(item)" :title="getTrackTitle(item)" target="_blank" class="ellipsis">
                <span class="linklist-badge">
                    <BandcampIcon v-if="item.bandcampId" />
                    <SoundcloudIcon v-if="item.soundcloudId" />
                    <VimeoIcon v-if="item.vimeoId" />
                    <YoutubeIcon v-if="item.youtubeId" />
                </span>
                <span v-text="getTrackTitle(item)"></span>
            </a>
            <span class="dim">{{ formatTimestamp(item.lastPlayedTimestamp) }}</span>
        </div>
    </section>

    <Pagination v-if="activity.length" :meta="meta" @pageChange="fetchActivity" />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { formatTimestamp, formatProviderUrl, getTrackTitle } from '../utils';
    import BandcampIcon from '../components/BandcampIcon.vue';
    import SoundcloudIcon from '../components/SoundcloudIcon.vue';
    import VimeoIcon from '../components/VimeoIcon.vue';
    import YoutubeIcon from '../components/YoutubeIcon.vue';
    import Pagination from '../components/Pagination.vue';

    let activity = ref([]);
    let meta = ref({});

    const fetchActivity = async (page = 1) => {
        try {
            const activityResponse = await fetch(`/api/activity?page=${page}&limit=50`);
            const activityJson = await activityResponse.json();

            activity.value = activityJson.data;
            meta.value = activityJson.meta;
        } catch(err) {
            console.error(err);
        }
    }

    onMounted(fetchActivity);
</script>
