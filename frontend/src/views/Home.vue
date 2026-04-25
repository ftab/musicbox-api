<template>
    <Spinner v-if="statsLoading || leaderboardLoading" />

    <template v-else>
        <h2>Top 50 Contributors</h2>
        <p>{{ stats.total_users }} users collected {{ stats.total_songs }} unique songs by {{ stats.total_artists }} artists</p>

        <section key="list" class="list">
            <div v-for="(user, index) in leaderboard" :key="index" class="list-row">
                <div class="accent">{{ index + 1 }}.</div>
                <div class="ellipsis">
                    <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname">
                        {{ user.nickname }}
                    </RouterLink>
                </div>
                <div class="progress-area">
                    <span class="dim">{{ pluralize(user.video_count, 'song') }}</span>
                    <progress max="100" :value="progressWidth(user)">{{ userPercentage(user) }}</progress>
                    <small class="dim">{{ userPercentage(user) }}%</small>
                </div>
            </div>
        </section>
    </template>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { pluralize } from '../utils';
    import { useFetch } from '../composables/useFetch';
    import Spinner from '../components/Spinner.vue';

    const { data: stats, loading: statsLoading, get: getStats } = useFetch();
    const { data: leaderboard, loading: leaderboardLoading, get: getLeaderboard } = useFetch();

    const progressWidth = user => (user.video_count / leaderboard.value[0].video_count) * 100;
    const userPercentage = user => ((user.video_count / stats.value.total_songs) * 100).toFixed(1).padStart(4, 0);

    onMounted(async () => {
        await Promise.all([
            getStats('/api/stats'),
            getLeaderboard('/api/leaderboard', { query: { limit: 50 } }),
        ]);
    });
</script>
