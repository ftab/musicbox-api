<template>
    <Spinner v-if="statsLoading || leaderboardLoading" />

    <template v-else>
        <header class="page-header">
            <h1>Top 50 Contributors</h1>
            <p>{{ stats.total_users }} users collected {{ stats.total_songs }} unique songs by {{ stats.total_artists }} artists</p>
        </header>

        <section class="list">
            <div v-for="(user, index) in leaderboard" :key="index" class="list-row">
                <div class="text-accent text-end">{{ index + 1 }}.</div>
                <RouterLink :to="{ name: 'profile', params: { nickname: user.nickname } }" :title="user.nickname" class="text-ellipsis">
                    {{ user.nickname }}
                </RouterLink>
                <div class="progress-area">
                    <span class="text-soft">{{ pluralize(user.video_count, 'song') }}</span>
                    <progress max="100" :value="progressWidth(user)">{{ userPercentage(user) }}</progress>
                    <small class="text-soft">{{ userPercentage(user) }}%</small>
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
        await Promise.allSettled([
            getStats('/api/stats'),
            getLeaderboard('/api/leaderboard', { query: { limit: 50 } }),
        ]);
    });
</script>
