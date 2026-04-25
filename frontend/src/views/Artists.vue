<template>
    <h2>Artists</h2>
    <div class="alphabet-filter">
        <RouterLink v-for="letter in letters.split('')" :to="{ name: 'artists', params: { letter } }" :key="letter" :title="letter === '_' ? '#': letter" class="letter">
            {{ letter === '_' ? '#' : letter }}
        </RouterLink>
    </div>

    <Spinner v-if="loading" />

    <template v-else>
        <section class="list">
            <div v-for="(artist, index) in data" :key="index" class="list-row">
                <div class="accent">{{ calculateRank(index, meta) }}.</div>
                <div class="ellipsis">
                    <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name">
                        {{ artist.name }}
                    </RouterLink>
                </div>
                <div class="dim">{{ pluralize(artist.video_count, 'track') }}</div>
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

<style>
    .alphabet-filter {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: .3rem;
        margin-block: 1.25rem 1.5rem;
    }

    .letter {
        display: inline-block;
        background-color: light-dark(var(--color-lightest), var(--color-dark));
        text-decoration: none;
        padding: .15rem .5rem;
        aspect-ratio: 1;
    }

    .letter.router-link-active,
    .letter.router-link-active:hover {
        background-color: light-dark(var(--color-accent-dark), var(--color-accent-light));
        color: light-dark(var(--color-lightest), var(--color-darkest));
    }

    @media(width < 831px) {
        .alphabet-filter {
            justify-content: start;
        }
    }
</style>
