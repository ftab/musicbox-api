<template>
    <header class="page-header">
        <h1>Artists</h1>
    </header>

    <div class="alphabet-filter">
        <RouterLink v-for="letter in letters.split('')" :to="{ name: 'artists', params: { letter } }" :key="letter" :title="letter === '_' ? '#': letter" class="letter">
            {{ letter === '_' ? '#' : letter }}
        </RouterLink>
    </div>

    <Spinner v-if="loading" />

    <template v-else>
        <section class="list">
            <div v-for="(artist, index) in data" :key="index" class="list-row">
                <div class="text-accent text-end">{{ calculateRank(index, meta) }}.</div>
                <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name" class="text-ellipsis">
                    {{ artist.name }}
                </RouterLink>
                <div class="text-soft text-end">{{ pluralize(artist.video_count, 'track') }}</div>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getArtists" />
    </template>
</template>

<script setup>
    import { watch } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { pluralize, calculateRank } from '../utils';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        letter: {
            type: String,
            default: 'A',
        },
        page: {
            type: Number,
            required: true,
        },
    });

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    const { data, meta, loading, get } = useFetch();

    const getArtists = async (page = props.page) => {
        await get('/api/artist', { query: {
            page,
            limit: 50,
            filter: props.letter,
        } });
    };

    watch(() => props.letter, () => getArtists(), { immediate: true });
</script>
