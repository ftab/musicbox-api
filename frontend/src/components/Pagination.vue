<template>
    <vue-awesome-paginate
        :total-items="meta.total[0].numRows"
        :items-per-page="meta.perPage"
        :max-pages-shown="5"
        v-model="currentPage"
        @click="pageChange"
    />
</template>

<script setup>
    import { onMounted, ref, computed, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute();
    const props = defineProps(['meta']);
    const emit = defineEmits(['pageChange']);
    const currentPage = ref(parseInt(route.query.page, 10) || 1);
    const totalPages = computed(() => Math.ceil(props.meta.total[0].numRows / props.meta.perPage));

    watch(() => route.query.page, page => {
        currentPage.value = parseInt(page, 10) || 1;
        emit('pageChange', currentPage.value);
    });

    const pageChange = page => {
        if(page < 1) page = 1;
        if(page > totalPages.value) page = totalPages.value;

        currentPage.value = page;

        router.push({
            query: {
                ...route.query,
                page: page > 1 ? page : undefined,
            },
        });
    };
</script>

<style>
    .pagination-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: end;
        list-style: none;
        padding: 0;
    }

    .paginate-buttons {
        color: var(--color-accent-light);
        background: transparent;
        padding: .5rem .7rem;
        border-radius: 0;
        border: 1px solid var(--color-accent-dark);
        cursor: pointer;
        transition: background-color 300ms ease-in-out;
    }

    .active-page {
        background: var(--color-accent-dark);
        color: var(--color-accent-light);
    }

    .paginate-buttons:hover {
        background: var(--color-accent-dark);
    }
</style>
