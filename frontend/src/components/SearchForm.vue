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
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon.vue';

    const searchInput = ref(null);
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

<style>
    form {
        display: grid;
        grid-template-columns: auto 1fr auto;
        margin-bottom: 2rem;
        border-bottom: 1px solid light-dark(var(--color-neutral-light), var(--color-neutral-dark));
    }

    form:focus-within {
        border-color: light-dark(var(--color-accent-dark), var(--color-accent-light));

        & .search-input {
            outline: none;
        }
    }

    .search-prefix {
        color: light-dark(var(--color-neutral-light), var(--color-neutral-dark));
        text-align: center;
        width: 1rem;
        height: 1rem;
    }

    .search-prefix,
    .search-input,
    .search-button {
        padding-block: .75rem;
    }

    .search-input {
        font-family: inherit;
        background: transparent;
        border: none;
        caret-color: light-dark(var(--color-accent-dark), var(--color-accent-light));
    }

    .search-input::placeholder {
        color: light-dark(var(--color-neutral-light), var(--color-neutral-dark));
        opacity: 1;
    }

    .search-button {
        background: transparent;
        width: fit-content;

        & svg {
            width: 1rem;
            height: 1rem;
            fill: light-dark(var(--color-neutral-light), var(--color-neutral-dark));
        }
    }
</style>
