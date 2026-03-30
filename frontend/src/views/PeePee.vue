<template>
    <h2>PP Leaderboard</h2>
    <p>Ranked by PP score (total relinks)</p>

    <section class="list">
        <div v-if="leaderboardItems.length" v-for="(user, index) in leaderboardItems" :key="index" class="list-row">
            <span class="accent">{{ index + 1 }}.</span>
            <span v-text="user.nickname" class="nickname ellipsis"></span>
            <span class="dim">{{ user.pp_score }} PP</span>
        </div>
    </section>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    let leaderboardItems = ref([]);

    onMounted(async () => {
        try {
            const leaderboardResponse = await fetch('/api/leaderboard/peepee?limit=50');
            const leaderboardJson = await leaderboardResponse.json();

            leaderboardItems.value = leaderboardJson.data;
        } catch(err) {
            console.error(err);
        }
    });
</script>
