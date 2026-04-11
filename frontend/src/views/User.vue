<template>
    <Spinner v-if="userLoading || videosLoading" />

    <template v-else>
        <h2 v-text="user.stats.nickname"></h2>
        <p>{{ user.stats.uniqueVideos }} unique songs · {{ user.stats.totalPlays }} total relinks · sharing since {{ formatTimestamp(user.stats.firstShared) }}</p>

        <Tabs v-if="user.topTags.length || user.topArtists.length">
            <Tab v-if="user.topTags.length" label="Top Genres">
                <ul class="tag-list">
                    <li v-for="(tag, index) in user.topTags" :key="tag">
                        {{ tag.name }} <span>({{ tag.count }})</span>
                    </li>
                </ul>
            </Tab>

            <Tab v-if="user.topArtists.length" label="Top Artists">
                <section class="list">
                    <div v-for="(artist, index) in user.topArtists" :key="artist.artistId" :title="artist.name" class="list-row flush">
                        <span class="accent">{{ index + 1 }}.</span>
                        <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" class="ellipsis">
                            <span>{{ artist.name }}</span>
                        </RouterLink>
                        <span class="dim">{{ pluralize(artist.trackCount, 'track') }}</span>
                    </div>
                </section>
            </Tab>
        </Tabs>

        <header>
            <h3>Full collection</h3>
            <DownloadButton :filename="`ulist_${user.stats.nickname}`" :url="`/api/videos?userid=${user.stats.userId}&limit=20000`" />
        </header>

        <section class="list">
            <div v-for="(video, index) in videos" :key="video.videoId" :data-flagged="video.isFlagged" :title="getTrackTitle(video)" class="list-row">
                <span class="accent">{{ formatTimestamp(video.lastPlayedTimestamp) }}</span>
                <RouterLink :to="{ name: 'song', params: { id: video.videoId }}" class="ellipsis">
                    <ProviderIcons :track="video" />
                    <span v-text="getTrackTitle(video)"></span>
                </RouterLink>
                <span class="dim">{{ pluralize(video.playCount, 'relink') }}</span>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getVideos" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFetch } from '../composables/useFetch';
    import { setPageTitle, formatTimestamp, getTrackTitle, pluralize } from '../utils';
    import Tabs from '../components/Tabs.vue';
    import Tab from '../components/Tab.vue';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import DownloadButton from '../components/DownloadButton.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const route = useRoute();
    const { data: user, loading: userLoading, get: getUser } = useFetch();
    const { data: videos, meta, loading: videosLoading, get } = useFetch();

    const getVideos = async (page = (route.query.page || 1)) => {
        await get(`/api/videos?userid=${encodeURIComponent(user.value.stats.userId)}&page=${encodeURIComponent(page)}&limit=50&sortBy=lastPlayedTimestamp`);
    };

    onMounted(async () => {
        await getUser(`/api/users/${encodeURIComponent(route.params.nickname)}`);

        if( ! user.value) return;

        setPageTitle(user.value.stats.nickname);

        await getVideos();
    });
</script>
