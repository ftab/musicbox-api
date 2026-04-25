<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>PP Leaderboard</h2>
        <p>Ranked by PP score (total relinks)</p>

        <section class="list">
            <div v-for="(user, index) in data" :key="index" class="list-row">
                <div class="accent">{{ index + 1 }}.</div>
                <span class="ellipsis">
                    <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname">
                        {{ user.nickname }}
                    </RouterLink>
                </span>
                <div class="dim">{{ user.pp_score }} PP</div>
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
