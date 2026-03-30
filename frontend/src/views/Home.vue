<template>
    <h2>Top 50 Contributors</h2>
    <p v-if="totalSongCount > 0">{{ totalSongCount }} unique songs collected</p>

    <section class="list leaderboard">
        <div v-if="leaderboardItems.length" v-for="(user, index) in leaderboardItems" :key="index" class="list-row">
            <span class="accent">{{ index + 1 }}.</span>
            <span v-text="user.nickname" class="nickname ellipsis"></span>
            <div class="progress-area">
                <span class="dim">{{ user.video_count }} songs</span>
                <progress max="100" :value="progressWidth(user)">{{ userPercentage(user) }}</progress>
                <small class="dim">{{ userPercentage(user).padStart(4, 0) }}%</small>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    let totalSongCount = ref(0);
    let leaderboardItems = ref([]);
    let highestVideoCount = ref(0);

    const progressWidth = user => (user.video_count / highestVideoCount.value) * 100;
    const userPercentage = user => ((user.video_count / totalSongCount.value) * 100).toFixed(1);

    onMounted(async () => {
        try {
            const statsResponse = await fetch('/api/stats');
            const statsJson = await statsResponse.json();
            const leaderboardResponse = await fetch('/api/leaderboard/top-50');
            const leaderboardJson = await leaderboardResponse.json();

            totalSongCount.value = statsJson.data;
            leaderboardItems.value = leaderboardJson.data;
            highestVideoCount.value = leaderboardItems.value[0].video_count;
        } catch(err) {
            console.error(err);
        }
    });
</script>
