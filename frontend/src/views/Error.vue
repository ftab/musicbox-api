<template>
    <h2>Uh oh!</h2>
    <p>Looks like this track got lost in the queue...</p>
    <RouterLink :to="{ name: 'home' }">Take me back home</RouterLink>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';

    onMounted(() => document.body.classList.add('error'));
    onUnmounted(() => document.body.classList.remove('error'));
</script>

<style>
    body.error {
        display: grid;
        place-content: center;
        text-align: center;
        background: var(--color-darkest);
        min-height: 100svh;
    }
</style>
