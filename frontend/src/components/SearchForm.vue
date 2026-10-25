<template>
    <form @submit.prevent="search">
        <div class="search-prefix">/</div>
        <input ref="searchInput" class="search-input" v-model="searchTerm" type="text" placeholder="Song title..." minlength="2" required>
        <button class="search-button">
            <MagnifyingGlassIcon />
        </button>
    </form>
</template>

<script setup>
    import { ref, useTemplateRef, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon.vue';

    const searchInput = useTemplateRef('searchInput');
    const searchTerm = ref(null);
    const router = useRouter();

    const search = () => {
        if( ! searchTerm.value || searchTerm.value.length < 2) return;

        router.push({
            name: 'search',
            query: { searchTerm: searchTerm.value },
        });

        searchTerm.value = null;
    };

    onMounted(() => searchInput.value.focus());
</script>
