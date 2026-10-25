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
