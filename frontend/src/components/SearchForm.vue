<template>
    <form @submit.prevent="search">
        <div class="search-prefix">/</div>
        <input ref="searchInput" class="search-input" v-model="searchTerm" type="text" placeholder="Song title..." required>
        <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </button>
    </form>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const searchInput = ref(null);
    const searchTerm = ref(null);
    const router = useRouter();

    const search = () => {
        if( ! searchTerm.value) return;

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
        border-bottom: 1px solid var(--color-neutral);
    }

    form:focus-within {
        border-color: var(--color-accent-light);

        & .search-input {
            outline: none;
        }
    }

    .search-prefix {
        color: var(--color-neutral);
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
        caret-color: var(--color-accent-light);
    }

    .search-input::placeholder {
        color: var(--color-neutral);
        opacity: 1;
    }

    .search-button {
        background: transparent;
        width: fit-content;

        & svg {
            width: 1rem;
            height: 1rem;
            fill: var(--color-neutral);
        }
    }
</style>
