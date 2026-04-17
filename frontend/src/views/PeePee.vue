<template>
    <Spinner v-if="loading" />

    <template v-else>
        <h2>PP Leaderboard</h2>
        <p>Ranked by PP score (total relinks)</p>

        <section class="list">
            <div v-for="(user, index) in leaderboard" :key="index" :title="user.nickname" class="list-row">
                <span class="accent">{{ index + 1 }}.</span>
                <span class="nickname ellipsis">
                    <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname}}">
                        {{ user.nickname }}
                    </RouterLink>
                </span>
                <span class="dim">{{ user.pp_score }} PP</span>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useFetch } from '../composables/useFetch';
    import Spinner from '../components/Spinner.vue';

    const { data: leaderboard, loading, get } = useFetch();

    onMounted(async () => {
        await get('/api/leaderboard/peepee', { query: { limit: 50 } });
    });
</script>
