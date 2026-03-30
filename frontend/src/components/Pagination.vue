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
    import { ref, computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const props = defineProps(['meta']);
    const emit = defineEmits(['pageChange']);

    const router = useRouter();
    const route = useRoute();

    let currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(props.meta.total[0].numRows / props.meta.perPage));

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

        emit('pageChange', page);
    }
</script>
