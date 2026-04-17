<template>
    <h2>Artists</h2>
    <div class="alphabet-filter">
        <button @click="filterByLetter(letter)" v-for="letter in letters.split('')" :key="letter" :class="{ active: selectedLetter === letter }" :title="letter === '_' ? '#': letter" class="letter">
            {{ letter === '_' ? '#' : letter }}
        </button>
    </div>

    <Spinner v-if="loading" />

    <template v-else>
        <section class="list">
            <div v-for="(artist, index) in data" :key="index" class="list-row">
                <span class="accent">{{ calculateRank(index, meta) }}.</span>
                <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name" class="ellipsis">
                    <span>{{ artist.name }}</span>
                </RouterLink>
                <span class="dim">{{ pluralize(artist.video_count, 'track') }}</span>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getArtists" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useFetch } from '../composables/useFetch';
    import { pluralize, calculateRank } from '../utils';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const route = useRoute();
    const router = useRouter();
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    const selectedLetter = ref(route.query.filter || 'A');
    const { data, meta, loading, get } = useFetch();

    const filterByLetter = async letter => {
        selectedLetter.value = letter;
        await router.replace({ query: { filter: selectedLetter.value } });
        await getArtists();
    };

    const getArtists = async (page = (route.query.page || 1)) => {
        await get('/api/artist', { query: {
            page,
            limit: 50,
            filter: selectedLetter.value,
        } });
    };

    onMounted(async () => {
        if( ! route.query.filter) {
            await router.replace({ query: { filter: selectedLetter.value } });
        }

        await getArtists();
    });
</script>

<style>
    .alphabet-filter {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: .3rem;
        margin-block: .75rem 1.5rem;
    }

    .letter {
        background-color: light-dark(var(--color-lightest), var(--color-dark));
        padding: .25rem .5rem;
        aspect-ratio: 1;
    }

    .letter.active {
        background-color: light-dark(var(--color-accent-dark), var(--color-accent-light));
        color: light-dark(var(--color-lightest), var(--color-darkest));
    }

    @media(width < 831px) {
        .alphabet-filter {
            justify-content: start;
        }
    }
</style>
