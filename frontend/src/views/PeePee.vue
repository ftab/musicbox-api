<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2>PP Leaderboard</h2>
        <p>Ranked by PP score (total relinks)</p>

        <section class="list">
            <div v-for="(user, index) in leaderboardItems" :key="index" class="list-row">
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
    import { onMounted, ref } from 'vue';
    import Spinner from '../components/Spinner.vue';

    const isLoading = ref(true);
    const leaderboardItems = ref([]);

    onMounted(async () => {
        const leaderboardResponse = await fetch('/api/leaderboard/peepee?limit=50');
        const leaderboardJson = await leaderboardResponse.json();

        leaderboardItems.value = leaderboardJson.data;

        isLoading.value = false;
    });
</script>
