<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2>Search</h2>

        <SearchForm />

        <h3 v-if="searchTerm">Found {{ pluralize(searchResults.length, 'song') }} matching "{{ searchTerm }}"</h3>

        <section class="list">
            <div v-for="(result, index) in searchResults" :key="index" :data-flagged="result.isFlagged" class="list-row">
                <span class="accent">{{ index + 1 }}.</span>
                <a :href="formatProviderUrl(result)" :title="getTrackTitle(result)" target="_blank" class="ellipsis">
                    <ProviderIcons :track="result" />
                    <span v-text="getTrackTitle(result)"></span>
                </a>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, onBeforeRouteUpdate } from 'vue-router';
    import { setPageTitle, pluralize, getTrackTitle, formatProviderUrl } from '../utils';
    import SearchForm from '../components/SearchForm.vue';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Spinner from '../components/Spinner.vue';

    const isLoading = ref(true);
    const route = useRoute();
    const searchTerm = ref(null);
    const searchResults = ref([]);

    const search = async (term = route.query.searchTerm) => {
        isLoading.value = true;

        const searchResponse = await fetch(`/api/search/videos?searchTerm=${encodeURIComponent(term)}`);
        const searchJson = await searchResponse.json();

        searchResults.value = searchJson.data;
        searchTerm.value = term;

        isLoading.value = false;
    };

    onMounted(search);

    onBeforeRouteUpdate(to => search(to.query.searchTerm));
</script>
