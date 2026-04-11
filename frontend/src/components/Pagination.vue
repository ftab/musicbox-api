<template>
    <vue-awesome-paginate
        v-if="meta && meta.total[0].numRows > meta.perPage"
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

    const props = defineProps({
        meta: {
            type: Object,
            required: true,
        },
    });

    const router = useRouter();
    const route = useRoute();
    const emit = defineEmits(['pageChange']);
    const currentPage = ref(parseInt(route.query.page, 10) || 1);
    const totalPages = computed(() => Math.ceil(props.meta.total[0].numRows / props.meta.perPage));

    watch(() => route.query.page, page => {
        currentPage.value = parseInt(page, 10) || 1;
        emit('pageChange', currentPage.value);
    });

    const pageChange = page => {
        currentPage.value = page;

        router.push({
            query: {
                ...route.query,
                page: page > 1 ? page : undefined,
            },
        });
    };

    onMounted(() => {
        if(currentPage.value > totalPages.value) {
            pageChange(totalPages.value);
        }
    });
</script>

<style>
    .pagination-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: center;
        list-style: none;
        /* padding: 0; */
    }

    .paginate-buttons {
        color: var(--color-neutral-dark);
        background: transparent;
        padding: .5rem .7rem;
        border-radius: 0;
    }

    .active-page {
        background: light-dark(var(--color-accent-dark), var(--color-accent-light));
        color: light-dark(var(--color-lightest), var(--color-darkest));
    }

    .paginate-buttons:not(.active-page):hover {
        color: light-dark(var(--color-accent-dark), var(--color-accent-light));
    }

    .back-button,
    .next-button {
        color: light-dark(var(--color-accent-dark), var(--color-accent-light));
    }
</style>
