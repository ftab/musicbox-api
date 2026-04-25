<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>{{ data.artist.name }}</h2>
        <p v-if="data.tracks.meta">{{ pluralize(data.tracks.meta.total[0].numRows, 'track') }} in library</p>

        <template v-if="data.topSharers.length">
            <h3>Top Sharers</h3>

            <section class="list">
                <div v-for="(sharer, index) in data.topSharers" :key="sharer.nickname" class="list-row">
                    <div class="accent">{{ index + 1 }}.</div>
                    <div class="ellipsis">
                        <RouterLink :to="{ name: 'profile', params: { nickname: sharer.nickname } }" :title="sharer.nickname">
                            {{ sharer.nickname }}
                        </RouterLink>
                    </div>
                    <div class="dim">{{ pluralize(sharer.trackCount, 'track') }}</div>
                </div>
            </section>
        </template>

        <template v-if="data.tracks.data.length">
            <h3>Tracks</h3>

            <section class="list">
                <div v-for="(track, index) in data.tracks.data" :key="index" class="list-row">
                    <div class="accent">{{ track.role }}</div>
                    <div class="ellipsis">
                        <RouterLink :to="{ name: 'song', params: { id: track.videoId } }" :title="getTrackTitle(track)">
                            <ProviderIcons :track="track" />
                            <span>{{ getTrackTitle(track) }}</span>
                        </RouterLink>
                    </div>
                    <div class="dim">{{ pluralize(track.totalPlays, 'relink')}}</div>
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
