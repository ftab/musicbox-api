<template>
    <Spinner v-if="isLoading" />

    <template v-else>
        <h2>Top 50 Contributors</h2>
        <p>{{ totalSongCount }} unique songs collected</p>

        <section key="list" class="list leaderboard">
            <div v-for="(user, index) in leaderboardItems" :key="index" :title="user.nickname" class="list-row">
                <span class="accent">{{ index + 1 }}.</span>
                <span class="nickname ellipsis">
                    <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }">
                        {{ user.nickname }}
                    </RouterLink>
                </span>
                <div class="progress-area">
                    <span class="dim">{{ pluralize(user.video_count, 'song') }}</span>
                    <progress max="100" :value="progressWidth(user)">{{ userPercentage(user) }}</progress>
                    <small class="dim">{{ userPercentage(user).padStart(4, 0) }}%</small>
                </div>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { pluralize } from '../utils';
    import Spinner from '../components/Spinner.vue';

    const isLoading = ref(true);
    const totalSongCount = ref(0);
    const leaderboardItems = ref([]);
    const highestVideoCount = ref(0);

    const progressWidth = user => (user.video_count / highestVideoCount.value) * 100;
    const userPercentage = user => ((user.video_count / totalSongCount.value) * 100).toFixed(1);

    onMounted(async () => {
        const statsResponse = await fetch('/api/stats');
        const statsJson = await statsResponse.json();
        const leaderboardResponse = await fetch('/api/leaderboard?limit=50');
        const leaderboardJson = await leaderboardResponse.json();

        totalSongCount.value = statsJson.totalSongs;
        leaderboardItems.value = leaderboardJson.data;
        highestVideoCount.value = leaderboardItems.value[0].video_count;

        isLoading.value = false;
    });
</script>
