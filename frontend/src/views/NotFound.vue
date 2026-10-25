<template>
    <h1>Uh oh!</h1>
    <p>Looks like this track got lost in the queue...</p>
    <RouterLink :to="{ name: 'home' }">Take me back home</RouterLink>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';

    onMounted(() => document.documentElement.classList.add('error'));
    onUnmounted(() => document.documentElement.classList.remove('error'));
</script>
