<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>Artists</h2>
        <p>{{ pluralize(meta.total[0].numRows, 'artist') }} in library</p>

        <section class="list">
            <div v-for="(artist, index) in data" :key="index" class="list-row">
                <span class="accent">{{ calculateRank(index, meta) }}.</span>
                <RouterLink :to="{ name: 'artist', params: { id: artist.artistId } }" :title="artist.name" class="ellipsis">
                    <span>{{ artist.name }}</span>
                </RouterLink>
            </div>
        </section>

        <Pagination :meta="meta" @pageChange="getArtists" />
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useFetch } from '../composables/useFetch';
    import { pluralize, calculateRank } from '../utils';
    import Pagination from '../components/Pagination.vue';
    import Spinner from '../components/Spinner.vue';

    const route = useRoute();
    const { data, meta, loading, get } = useFetch();

    const getArtists = async (page = (route.query.page || 1)) => {
        await get(`/api/artist?page=${encodeURIComponent(page)}&limit=50`);
    };

    onMounted(getArtists);
</script>
