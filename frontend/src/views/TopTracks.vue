<template>
    <h2>Top Tracks</h2>
    <p>Most added songs across all users</p>

    <Pagination v-if="topTracks.length" :meta="meta" @pageChange="fetchTopTracks" />

    <section class="list">
        <div v-if="topTracks.length" v-for="(track, index) in topTracks" :key="index" :data-flagged="track.isFlagged" class="list-row">
            <span class="accent">{{ calculateRank(index, meta) }}.</span>
            <a :href="formatProviderUrl(track)" :title="getTrackTitle(track)" target="_blank" class="ellipsis">
                <span class="linklist-badge">
                    <BandcampIcon v-if="track.bandcampId" />
                    <SoundcloudIcon v-if="track.soundcloudId" />
                    <VimeoIcon v-if="track.vimeoId" />
                    <YoutubeIcon v-if="track.youtubeId" />
                </span>
                <span v-text="getTrackTitle(track)"></span>
            </a>
            <span class="dim">{{ track.totalPlays }} relinks</span>
        </div>
    </section>

    <Pagination v-if="topTracks.length" :meta="meta" @pageChange="fetchTopTracks" />
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { formatProviderUrl, getTrackTitle } from '../utils';
    import BandcampIcon from '../components/BandcampIcon.vue';
    import SoundcloudIcon from '../components/SoundcloudIcon.vue';
    import VimeoIcon from '../components/VimeoIcon.vue';
    import YoutubeIcon from '../components/YoutubeIcon.vue';
    import Pagination from '../components/Pagination.vue';

    let topTracks = ref([]);
    let meta = ref({});

    const calculateRank = (index, meta) => {
        const pageNum = parseInt(meta.page, 10) || 1;

        return (pageNum - 1) * meta.perPage + index + 1;
    };

    const fetchTopTracks = async (page = 1) => {
        try {
            const topTracksResponse = await fetch(`/api/tracks/top?page=${page}&limit=50`);
            const topTracksJson = await topTracksResponse.json();

            topTracks.value = topTracksJson.data;
            meta.value = topTracksJson.meta;
        } catch(err) {
            console.error(err);
        }
    };

    onMounted(fetchTopTracks);
</script>
