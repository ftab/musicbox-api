<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2 v-text="stats.nickname"></h2>
        <p>{{ stats.uniqueVideos }} unique songs · {{ stats.totalPlays }} total relinks · sharing since {{ formatTimestamp(stats.firstShared) }}</p>

        <Tabs v-if="tags.length || artists.length">
            <Tab v-if="tags.length" label="Top Genres">
                <ul class="tag-list">
                    <li v-for="(tag, index) in tags" :key="tag">
                        {{ tag.name }} <span>({{ tag.count }})</span>
                    </li>
                </ul>
            </Tab>

            <Tab v-if="artists.length" label="Top Artists">
                <section class="list">
                    <div v-for="(artist, index) in artists" class="list-row flush">
                        <span class="accent">{{ index + 1 }}.</span>
                        <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }">
                            <span>{{ artist.name }}</span>
                        </RouterLink>
                        <span class="dim">{{ pluralize(artist.trackCount, 'track') }}</span>
                    </div>
                </section>
            </Tab>
        </Tabs>

        <h3>Full collection <small class="dim">(Ordered by recent activity)</small></h3>

        <section class="list">
            <div v-for="(video, index) in videos" :key="video.videoId" :data-flagged="video.isFlagged" class="list-row">
                <span class="accent">{{ formatTimestamp(video.lastPlayedTimestamp) }}</span>
                <RouterLink :to="{ name: 'song', params: { id: video.videoId }}" class="ellipsis">
                    <ProviderIcons :track="video" />
                    <span v-text="getTrackTitle(video)"></span>
                </RouterLink>
                <span class="dim">{{ pluralize(video.playCount, 'relink') }}</span>
            </div>
        </section>

        <Pagination v-if="meta && meta.total[0].numRows > meta.perPage" :meta="meta" @pageChange="fetchVideos" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { setPageTitle, formatTimestamp, getTrackTitle, pluralize } from '../utils';
    import Tabs from '../components/Tabs.vue';
    import Tab from '../components/Tab.vue';
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
    const route = useRoute();
    const stats = ref({});
    const tags = ref([]);
    const artists = ref([]);
    const videos = ref([]);
    const meta = ref(null);

    const fetchUser = async () => {
        const userResponse = await fetch(`/api/users/${route.params.nickname}`);
        const userJson = await userResponse.json();

        stats.value = userJson.stats;
        tags.value = userJson.topTags;
        artists.value = userJson.topArtists;

        setPageTitle(stats.value.nickname);
    };

    const fetchVideos = async (page = props.initialPage) => {
        isLoading.value = true;

        const videosResponse = await fetch(`/api/videos?userid=${stats.value.userId}&page=${page}&limit=50`);
        const videosJson = await videosResponse.json();

        videos.value = videosJson.data;
        meta.value = videosJson.meta;

        isLoading.value = false;
    };

    onMounted(async () => {
        await fetchUser();
        await fetchVideos();
    });
</script>
