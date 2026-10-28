<template>
    <Spinner v-if="userLoading || videosLoading" />

    <template v-else>
        <header class="page-header">
            <h1 v-text="user.stats.nickname"></h1>
            <p>
                {{ user.stats.uniqueVideos }} unique songs ·
                {{ user.stats.totalPlays }} total relinks · sharing since
                {{ formatTimestamp(user.stats.firstShared) }}
            </p>
        </header>

        <Heatmap :data="user.heatmap" />

        <template v-if="user.topTags.length">
            <ul class="tags">
                <li v-for="tag in user.topTags" :key="tag">{{ tag.name }} ({{ tag.count }})</li>
            </ul>
        </template>

        <header class="section-header">
            <CustomSelect v-model="listType" :options="listTypes" />
            <DownloadButton v-if="listType === 'collection'" :loading="downloading" @download="downloadUlist" />
        </header>

        <section v-if="listType === 'collection'" class="list">
            <div v-for="(video, index) in videos" :key="video.videoId" :class="{ 'list-row': true, 'is-flagged': video.isFlagged }">
                <div class="text-accent">{{ formatTimestamp(video.lastPlayedTimestamp) }}</div>
                <RouterLink :to="{ name: 'song', params: { id: video.videoId } }" :title="getTrackTitle(video)" class="text-ellipsis">
                    <ProviderIcons :track="video" />
                    <span v-text="getTrackTitle(video)"></span>
                </RouterLink>
                <div class="text-soft text-end">{{ pluralize(video.playCount, 'relink') }}</div>
            </div>
        </section>

        <Pagination v-if="listType === 'collection'" :meta="meta" @pageChange="getVideos" />

        <section v-if="listType === 'artists'" class="list">
            <div v-for="(artist, index) in user.topArtists" :key="artist.artistId" :title="artist.name" class="list-row flush">
                <span class="text-accent text-end">{{ index + 1 }}.</span>
                <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" class="text-ellipsis">
                    <span>{{ artist.name }}</span>
                </RouterLink>
                <span class="text-soft text-edn">{{ pluralize(artist.trackCount, 'track') }}</span>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { useDownload } from '../composables/useDownload';
    import { setPageTitle, formatTimestamp, getTrackTitle, pluralize, formatUlistContent, formatTimestampForFilename } from '../utils';
    import Heatmap from '../components/Heatmap.vue';
    import CustomSelect from '../components/CustomSelect.vue';
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

    const listType = ref(null);
    const listTypes = [
        { value: 'collection', label: 'Full Collection'},
        { value: 'artists', label: 'Top Artists'},
    ];

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
        listType.value = listTypes[0].value;

        await getUser('/api/users/:nickname', {
            params: { nickname: props.nickname },
            query: { tz: Intl.DateTimeFormat().resolvedOptions().timeZone }
        });

        if( ! user.value) return;

        setPageTitle(user.value.stats.nickname);

        await getVideos();
    });
</script>
