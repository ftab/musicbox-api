<template>
    <header class="page-header">
        <h1>Search</h1>
    </header>

    <SearchForm />

    <Spinner v-if="loading" />

    <template v-else>
        <header class="section-header">
            <h2 v-if="data">Found {{ pluralize(data.length, 'song') }} matching "{{ searchTerm }}"</h2>
        </header>

        <section class="list">
            <div v-for="(result, index) in data" :key="index" :class="{ 'list-row': true, 'is-flagged': result.isFlagged }">
                <div class="text-accent text-end">{{ index + 1 }}.</div>
                <a :href="formatProviderUrl(result)" :title="getTrackTitle(result)" target="_blank" rel="noopener" class="text-ellipsis">
                    <ProviderIcons :track="result" />
                    <span v-text="getTrackTitle(result)"></span>
                </a>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { watch } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import { setPageTitle, pluralize, getTrackTitle, formatProviderUrl } from '../utils';
    import SearchForm from '../components/SearchForm.vue';
    import ProviderIcons from '../components/ProviderIcons.vue';
    import Spinner from '../components/Spinner.vue';

    const props = defineProps({
        searchTerm: {
            type: String,
            default: null,
        },
    });

    const { data, loading, get } = useFetch({ immediate: false });

    const search = async () => {
        if( ! props.searchTerm) return;

        setPageTitle(`Search results for "${props.searchTerm}"`);

        await get('/api/search/videos', { query: { searchTerm: props.searchTerm } });
    };

    watch(() => props.searchTerm, () => search(), { immediate: true });
</script>
