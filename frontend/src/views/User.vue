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
            <DownloadButton :loading="downloading" @download="downloadUlist" />
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
    import { onMounted } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { useDownload } from '../composables/useDownload';
    import { setPageTitle, formatTimestamp, getTrackTitle, pluralize, formatUlistContent, formatTimestampForFilename } from '../utils';
    import Tabs from '../components/Tabs.vue';
    import Tab from '../components/Tab.vue';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import DownloadButton from '../components/DownloadButton.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        nickname: {
            type: String,
            required: true,
        },
        page: {
            type: Number,
            required: true,
        }
    });

    const download = useDownload();
    const { data: user, loading: userLoading, get: getUser } = useFetch();
    const { data: videos, meta, loading: videosLoading, get: getUserVideos } = useFetch();
    const { data, loading: downloading, get: getUserDownload } = useFetch({ immediate: false });

    const downloadUlist = async () => {
        if( ! data.value) {
            await getUserDownload('/api/videos', { query: {
                limit: user.value.stats.uniqueVideos,
                userid: user.value.stats.userId,
            } });
        }

        const filename = `ulist_${user.value.stats.nickname}_${formatTimestampForFilename()}.txt`;
        const content = formatUlistContent(data.value);

        download(content, filename);
    };

    const getVideos = async (page = props.page) => {
        await getUserVideos('/api/videos', { query: {
            page,
            limit: 50,
            sortBy: 'lastPlayedTimestamp',
            userid: user.value.stats.userId,
        } });
    };

    onMounted(async () => {
        await getUser('/api/users/:nickname', { params: { nickname: props.nickname } });

        if( ! user.value) return;

        setPageTitle(user.value.stats.nickname);

        await getVideos();
    });
</script>
