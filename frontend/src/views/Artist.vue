<template>
    <Spinner v-if="loading" />

    <template v-else>
        <header class="page-header">
            <h1>{{ data.artist.name }}</h1>
            <p v-if="data.tracks.meta">{{ pluralize(data.tracks.meta.total[0].numRows, 'track') }} in library</p>
        </header>

        <template v-if="data.topSharers.length">
            <header class="section-header">
                <h2>Top Sharers</h2>
            </header>

            <section class="list">
                <div v-for="(sharer, index) in data.topSharers" :key="sharer.nickname" class="list-row">
                    <div class="text-accent text-end">{{ index + 1 }}.</div>
                    <RouterLink :to="{ name: 'profile', params: { nickname: sharer.nickname } }" :title="sharer.nickname" class="text-ellipsis">
                        {{ sharer.nickname }}
                    </RouterLink>
                    <div class="text-soft text-end">{{ pluralize(sharer.trackCount, 'track') }}</div>
                </div>
            </section>
        </template>

        <template v-if="data.tracks.data.length">
            <header class="section-header">
                <h2>Tracks</h2>
            </header>

            <section class="list">
                <div v-for="(track, index) in data.tracks.data" :key="index" class="list-row">
                    <div class="text-accent text-end">{{ track.role }}</div>
                    <RouterLink :to="{ name: 'song', params: { id: track.videoId } }" :title="getTrackTitle(track)" class="text-ellipsis">
                        <ProviderIcons :track="track" />
                        <span>{{ getTrackTitle(track) }}</span>
                    </RouterLink>
                    <div class="text-soft text-end">{{ pluralize(track.totalPlays, 'relink')}}</div>
                </div>
            </section>
        </template>

        <Pagination :meta="data.tracks.meta" @pageChange="getArtist" />
    </template>
</template>

<script setup>
    import { watch } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { setPageTitle, pluralize, getTrackTitle } from '../utils';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        id: {
            type: String,
            required: true,
        },
        page: {
            type: Number,
            required: true,
        },
    });

    const { data, loading, get } = useFetch();

    const getArtist = async (page = props.page) => {
        await get('/api/artist/:id', {
            params: { id: props.id },
            query: { page, limit: 50 },
        });

        if( ! data.value) return;

        setPageTitle(data.value.artist.name);
    };

    watch(() => props.id, () => getArtist(), { immediate: true });
</script>
