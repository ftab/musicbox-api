<template>
    <h2 v-if="user" v-text="user.nickname"></h2>
    <p v-if="stats">{{ stats[0].uniqueVideos }} unique songs · {{ stats[0].totalPlays }} total relinks · sharing since {{ formatTimestamp(stats[0].firstShared) }}</p>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { formatTimestamp } from '../utils';

    const route = useRoute();
    const user = ref(null);
    const stats = ref(null);

    onMounted(async () => {
        const userResponse = await fetch(`/api/users/${route.params.nickname}`);
        const userJson = await userResponse.json();
        const statsResponse = await fetch(`/api/users/${route.params.nickname}/stats`);
        const statsJson = await statsResponse.json();

        user.value = userJson.user;
        stats.value = statsJson.data;
    });
</script>
