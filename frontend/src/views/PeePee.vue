<template>
    <Spinner v-if="loading" />

    <template v-else>
        <header class="page-header">
            <h1>PP Leaderboard</h1>
            <p>Ranked by PP score (total relinks)</p>
        </header>

        <section class="list">
            <div v-for="(user, index) in data" :key="index" class="list-row">
                <div class="text-accent text-end">{{ index + 1 }}.</div>
                <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname" class="text-ellipsis">
                    {{ user.nickname }}
                </RouterLink>
                <div class="text-soft text-end">{{ user.pp_score }} PP</div>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import Spinner from '../components/Spinner.vue';

    const { data, loading, get } = useFetch();

    onMounted(async () => {
        await get('/api/leaderboard/peepee', { query: { limit: 50 } });
    });
</script>
